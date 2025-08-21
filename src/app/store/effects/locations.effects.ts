import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LocationActions from '../actions/locations.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectLocations } from '../selectors/locations.selectors';

@Injectable()
export class LocationsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocation),
      withLatestFrom(this.store.select(selectLocations)),
      mergeMap(([{ id }, locations]) => {
        const location = locations[id];
        return location
          ? EMPTY
          : from(this.apiService.getLocation(id)).pipe(
              map((result) => {
                return LocationActions.loadLocationSuccess({
                  location: result,
                });
              }),
              catchError((error) =>
                of(LocationActions.loadLocationFailure({ error: error.message })),
              ),
            );
      }),
    ),
  );
}
