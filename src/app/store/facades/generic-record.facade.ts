import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

export abstract class GenericRecordFacade<T> {
  constructor(protected store: Store) {}

  protected abstract loadAction: (params: { id: number }) => any;
  protected abstract selectRecord: (id: number) => any;
  // how to make them optional in implementation?:

  protected loadManyAction?: (params: { ids: number[] }) => any;
  protected selectManyRecords?: (ids: number[]) => any;

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

  getRecords(ids: number[]): Observable<T[]> {
    if(!this.selectManyRecords) {
      throw new Error('selectManyRecords is not implemented');
    }
    if(!this.loadManyAction) {
      throw new Error('loadManyAction is not implemented');
    }
    this.store.select(this.selectManyRecords(ids)).pipe(
      take(1)
    ).subscribe((items) => {
      const typedItems = items as {id: number}[]  ;
      const existingIds = typedItems.map(item => item.id);
      let missingIds: number[] = [];
      for (let i = 0; i < ids.length; i++) {
        if (!existingIds.includes(ids[i])) {
          missingIds.push(ids[i]);
        }
      }
      if (missingIds.length && this.loadManyAction) {
        this.store.dispatch(this.loadManyAction({ ids: missingIds }));
      }
    });
    return this.store.select(this.selectManyRecords(ids));
  }
}
