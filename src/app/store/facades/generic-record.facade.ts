import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

export abstract class GenericRecordFacade<T> {
  constructor(protected store: Store) {}

  protected abstract loadAction: (params: { id: number }) => any;
  protected abstract selectRecord: (id: number) => any;
  // how to make them optional in implementation?:

  protected loadManyAction?: (params: { ids: number[] }) => any;
  protected selectManyRecords?: (ids: number[]) => any;

  getRecord(id: number): Observable<T> {
    this.store
      .select(this.selectRecord(id))
      .pipe(take(1))
      .subscribe((item) => {
        if (!item) {
          this.store.dispatch(this.loadAction({ id }));
        }
      });
    return this.store.select(this.selectRecord(id));
  }

  getRecords(ids: number[]): Observable<T[]> {
    if (!this.selectManyRecords) {
      throw new Error('selectManyRecords is not implemented');
    }
    if (!this.loadManyAction) {
      throw new Error('loadManyAction is not implemented');
    }
    this.store
      .select(this.selectManyRecords(ids))
      .pipe(take(1))
      .subscribe((items) => {
        const typedItems = items as { id: number }[];
        const existingIds = typedItems.map((item) => item.id);
        const missingIds: number[] = [];
        for (const id of ids) {
          if (!existingIds.includes(id)) {
            missingIds.push(id);
          }
        }
        if (missingIds.length && this.loadManyAction) {
          this.store.dispatch(this.loadManyAction({ ids: missingIds }));
        }
      });
    return this.store.select(this.selectManyRecords(ids));
  }
}
