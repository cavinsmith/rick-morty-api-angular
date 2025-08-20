import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, Input, TemplateRef, OnInit, ContentChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericPagesFacade } from '../../store/facades/generic-pages.facade';
import { Observable } from 'rxjs';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-generic-list',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './generic-list-pages.component.html',
  styleUrl: './generic-list-pages.component.scss'
})
export class GenericListPagesComponent<T, F> implements OnInit, OnChanges {
  @Input() pagesFacade!: GenericPagesFacade<T, F>;
  @Input() initialPage: number = 1;
  @Input() filter!: F;
  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;

  currentPage: number = 1;
  totalPages$!: Observable<number>;
  items$!: Observable<T | undefined>;

  ngOnInit() {
    this.currentPage = this.initialPage;
    this.totalPages$ = this.pagesFacade.getTotalPages();

    this.updatePage();
  }

  ngOnChanges(
    changes: SimpleChanges
  ) {
    if (!isEqual(changes['filter'].currentValue, changes['filter'].previousValue)) {
      console.log('Filter changed:', changes['filter'].currentValue,changes['filter'].previousValue );
      this.currentPage = 1;
      this.updatePage();
    }
  }

  onPreviousPage() {
    this.currentPage--;
    this.updatePage();
  }

  onNextPage() {
    this.currentPage++;
    this.updatePage();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updatePage();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private updatePage() {
    this.items$ = this.pagesFacade.getPage(this.currentPage, this.filter);
  }
}