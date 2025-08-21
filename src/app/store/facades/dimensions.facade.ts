import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as DimensionsActions from '../actions/dimensions.actions';
import { selectDimension }  from '../selectors/dimensions.selectors';
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

}
