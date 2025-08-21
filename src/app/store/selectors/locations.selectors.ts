import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsState } from '../reducers/locations.reducer';
import { Location } from '../models/location.model';

export const selectLocationsPagesState = createFeatureSelector<LocationsState>('locations');

export const selectLocations = createSelector(
  selectLocationsPagesState,
  (state) => state.locations,
);

export const selectLocation = (id: number) =>
  createSelector(selectLocationsPagesState, (state) => state.locations[id] as Location | undefined);

export const selectLocationLoading = createSelector(
  selectLocationsPagesState,
  (state) => state.loading,
);

export const selectLocationError = createSelector(
  selectLocationsPagesState,
  (state) => state.error,
);

export const selectDimensionFromLocation = (id: number) =>
  createSelector(selectLocationsPagesState, (state) => state.locations[id]?.dimension as string);
