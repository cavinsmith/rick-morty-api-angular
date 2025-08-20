import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

export abstract class GenericRecordFacade<T> {
  constructor(protected store: Store) {}

  protected abstract loadAction: (params: { id: number }) => any;
  protected abstract selectRecord: (id: number) => any;
  protected abstract loadManyAction: (params: { ids: number[] }) => any;
  protected abstract selectManyRecords: (ids: number[]) => any;

  getRecord(id: number): Observable<T | undefined> {
    this.store.select(this.selectRecord(id)).pipe(
      take(1)
    ).subscribe(item => {
      console.log('Checking for character with ID:', id);
      if (!item) {
        console.log('Character not found, dispatching load action.');
        this.store.dispatch(this.loadAction({ id }));
      }
    });
    return this.store.select(this.selectRecord(id));
  }

  getRecords(ids: number[]): Observable<(T | undefined)[]> {
    this.store.select(this.selectManyRecords(ids)).pipe(
      take(1)
    ).subscribe((items ) => {
      const typedItems = items as { [key: number]: T | undefined };
      let missingIds: number[] = [];
      for (let i = 0; i < ids.length; i++) {
        if (typedItems[ids[i]]) {
          missingIds.push(ids[i]);
        }
      }
      if (missingIds.length) {
        this.store.dispatch(this.loadManyAction({ ids: missingIds }));
      }
    });
    return this.store.select(this.selectManyRecords(ids));
  }
}
