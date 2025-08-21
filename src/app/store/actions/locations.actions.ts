import { createAction, props } from '@ngrx/store';
import { Location } from '../models/location.model';

export const loadLocation = createAction('[Locations] Load Location', props<{ id: number }>());

export const loadLocationSuccess = createAction(
  '[Locations] Load Location Success',
  props<{ location: Location }>(),
);

export const loadLocationsSuccess = createAction(
  '[Locations] Load Locations Success',
  props<{ locations: Location[] }>(),
);

export const loadLocationFailure = createAction(
  '[Locations] Load Location Failure',
  props<{ error: string }>(),
);
