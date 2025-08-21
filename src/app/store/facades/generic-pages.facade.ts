import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

export abstract class GenericPagesFacade<T, F> {
  constructor(protected store: Store) {}

  protected abstract loadAction: (params: { page: number, filter: F }) => any;
  protected abstract selectPage: (page: number, filter: F) => any;
  protected abstract selectPageIsLoaded: (page: number, filter: F) => any;
  protected abstract selectTotalPagesAndItems?: any;

  getPage(page: number, filter: F): Observable<T | undefined> {
    this.store.select(this.selectPageIsLoaded(page, filter)).pipe(
      take(1)
    ).subscribe(isLoaded => {
      if (!isLoaded) {
        this.store.dispatch(this.loadAction({ page, filter }));
      }
    });
    return this.store.select(this.selectPage(page, filter));
  }

  getTotalPagesAndItems(): Observable<{ totalPages: number, totalItems: number }> {
    if(!this.selectTotalPagesAndItems) {
      throw new Error('selectTotalPagesAndItems is not implemented');
    }
    return this.store.select(this.selectTotalPagesAndItems);
  }
}
