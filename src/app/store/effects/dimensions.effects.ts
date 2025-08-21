import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DimensionsActions from '../actions/dimensions.actions';
import { catchError,  mergeMap, withLatestFrom, of, from, EMPTY, map, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectDimension } from '../selectors/dimensions.selectors';


@Injectable()
export class DimensionsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

  loadAllCharactersInDimension$ = createEffect(() => this.actions$.pipe(
    ofType(DimensionsActions.loadAllCharactersInDimension),
    withLatestFrom(
      this.actions$.pipe(
        ofType(DimensionsActions.loadAllCharactersInDimension),
        switchMap(action => this.store.select(selectDimension(action.dimension)))
      )
    ),
    mergeMap(([{ dimension }, location]) => {   
      if (location) {
        return EMPTY;
      }
      return from(this.apiService.getCharactersInDimension(dimension)).pipe(
        map((result) => {
          return DimensionsActions.loadAllCharactersInDimensionSuccess({
            dimension,
            residents: result.residents,
            locations: result.locations
          });
        }),
        catchError((error) => {
          return of(DimensionsActions.loadAllCharactersInDimensionFailure({ error: error.message }));
        })
      );
    })
  ));

  loadAllDimensionNames$ = createEffect(() => this.actions$.pipe(
    ofType(DimensionsActions.loadAllDimensions),
    mergeMap(() => {
      return from(this.apiService.getAllDimensions()).pipe(
        map((result) => {
          return DimensionsActions.loadAllDimensionsSuccess({ dimensions: result });
        }),
        catchError((error) => {
          return of(DimensionsActions.loadAllDimensionsFailure({ error: error.message }));
        })
      );
    })
  ));
}