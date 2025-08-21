import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as DimensionsActions from '../actions/dimensions.actions';
import { selectDimension, selectDimensionNames }  from '../selectors/dimensions.selectors';
import { Dimension } from  '../models/dimension.model'
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DimensionsFacade {
  private store = inject(Store);

  getAllCharactersInDimension(name: string): Observable<Dimension | undefined> {
    this.store.select(selectDimension(name)).pipe(
      take(1)
    ).subscribe(item => {
      if (!item) {
        this.store.dispatch(DimensionsActions.loadAllCharactersInDimension({ dimension: name }));
      }
    });
    return this.store.select(selectDimension(name));
  }

  getAllDimensionNames(): Observable<{name: string, id: number}[]> {
    this.store.select(selectDimensionNames).pipe(
      take(1),
    ).subscribe(dimensions => {
      if (!dimensions || dimensions.length === 0) {
        this.store.dispatch(DimensionsActions.loadAllDimensions());
        }
      });
    return this.store.select(selectDimensionNames);
  }

}
