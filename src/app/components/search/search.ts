import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { isEqual } from 'lodash';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Loader } from '../loader/loader';
import { GenericPagesFacade } from '../../store/facades/generic-pages.facade';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search<T extends { id: number; [key: string]: any }, F> implements OnInit {
  searchControl = new FormControl('');
  @Input() pagesFacade!: GenericPagesFacade<T[], F>;
  @Input() routeLink!: string;
  searchFilter: F = {} as F;
  // Parameter input value of search field e.g. "dimension" or "name"
  @Input() searchParameter = 'name';
  @Input() searchName = 'unknown';

  items$!: Observable<{ id: number; value: string }[] | undefined>;
  private readonly router = inject(Router);

  ngOnInit() {
    this.updatePage();
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        const currentSearchFilter = { ...this.searchFilter };
        if (value && value.trim()) {
          this.searchFilter = { [this.searchParameter]: value.trim() } as F;
        } else {
          this.searchFilter = {} as F;
        }
        if (!isEqual(currentSearchFilter, this.searchFilter)) {
          this.updatePage();
        }
      });
  }

  private updatePage() {
    // need to filter the results by value
    this.items$ = this.pagesFacade.getPage(1, this.searchFilter).pipe(
      map((entities) => {
        if (!entities) return [];

        const values = entities.map((entity) => {
          return {
            id: entity.id,
            value: (entity as any)[this.searchParameter] as string,
          };
        });

        // Filter out undefined/null values and remove duplicates
        const validValues = values.filter((item) => item.value != null && item.value !== '');

        // Remove duplicates based on value property
        const uniqueValues = validValues.filter(
          (item, index, array) => index === array.findIndex((t) => t.value === item.value),
        );

        return uniqueValues;
      }),
    );
  }

  // onselect event for mat-option
  public onSelect(option: { id: number; value: string }) {
    this.router.navigate(['/', this.routeLink, option.id]);
  }
}
