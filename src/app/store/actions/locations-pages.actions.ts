import { createAction, props } from '@ngrx/store';
import { Location } from '../models/location.model';
import { LocationFilter } from 'rickmortyapi';

export const loadLocationsPages = createAction(
  '[LocationsPages] Load Locations Page',
  props<{ page: number, filter: LocationFilter }>()
);

export const loadLocationsAllPages = createAction(
  '[LocationsPages] Load Locations All Pages',
  props<{ filter: LocationFilter }>()
);

export const loadLocationsPagesSuccess = createAction(
  '[LocationsPages] Load Locations Page Success',
  props<{ page: number; locations: Location[]; totalPages: number, totalItems: number, filter: LocationFilter }>()
);

export const loadLocationsPageFailure = createAction(
  '[LocationsPages] Load Locations Page Failure',
  props<{ error: string }>()
);