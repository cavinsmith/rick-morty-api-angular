import { MatPaginatorModule } from '@angular/material/paginator';
import {
  Component,
  Input,
  TemplateRef,
  OnInit,
  ContentChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericPagesFacade } from '../../store/facades/generic-pages.facade';
import { Observable } from 'rxjs';
import { isEqual } from 'lodash';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-generic-list',
  imports: [CommonModule, MatPaginatorModule, Loader],
  templateUrl: './generic-list-pages.component.html',
  styleUrl: './generic-list-pages.component.scss',
})
export class GenericListPagesComponent<T, F> implements OnInit, OnChanges {
  @Input() pagesFacade!: GenericPagesFacade<T, F>;
  @Input() initialPage = 1;
  @Input() filter!: F;
  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;

  currentPage = 1;
  totalPagesAndItems$!: Observable<{ totalPages: number; totalItems: number }>;
  items$!: Observable<T | undefined>;

  ngOnInit() {
    this.currentPage = this.initialPage;
    this.totalPagesAndItems$ = this.pagesFacade.getTotalPagesAndItems();

    this.updatePage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['filter'] &&
      !isEqual(changes['filter'].currentValue, changes['filter'].previousValue)
    ) {
      this.currentPage = 1;
      this.updatePage();
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updatePage();
  }

  trackByFn(index: number, item: any): any {
    return item.id || item.name || index;
  }

  private updatePage() {
    this.items$ = this.pagesFacade.getPage(this.currentPage, this.filter);
  }
}
