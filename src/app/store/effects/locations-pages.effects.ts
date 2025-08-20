import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LocationsPagesActions from '../actions/locations-pages.actions';
import * as LocationActions from '../actions/locations.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectLocationsPageIsLoaded } from '../selectors/locations-pages.selectors';
import { LocationFilter } from 'rickmortyapi';

@Injectable()
export class LocationsPagesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

loadLocationsPage$ = createEffect(() => this.actions$.pipe(
    ofType(LocationsPagesActions.loadLocationsPages),
    withLatestFrom(
      this.actions$.pipe(
        ofType(LocationsPagesActions.loadLocationsPages),
        switchMap(action => this.store.select(selectLocationsPageIsLoaded(action.page, action.filter)))
      )
    ),
    mergeMap(([{ page, filter }, pageIsLoaded]) => pageIsLoaded ? EMPTY : 
        from(this.apiService.getLocations(page, filter)).pipe(
          mergeMap((result) => from([
            LocationsPagesActions.loadLocationsPagesSuccess({
              locations: result.locations,
              page: page,
              totalPages: result.pages,
              filter: filter as LocationFilter
            }),
            LocationActions.loadLocationsSuccess({ 
              locations: result.locations 
            })
          ])),
          catchError((error) => of(LocationsPagesActions.loadLocationsPageFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );

}