
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsPagesState } from '../reducers/locations-pages.reducer'
import { isEqual } from 'lodash'; 
import { LocationFilter } from 'rickmortyapi';

export const selectLocationsPagesState = createFeatureSelector<LocationsPagesState>('locationsPages');


export const selectLocationsPage = (page: number, filter: LocationFilter) => createSelector(
  selectLocationsPagesState,
  (state) => isEqual(state.filter, filter) ? state.pages[page] : undefined
);

export const selectLocationsPageIsLoaded = (page: number, filter: LocationFilter) => createSelector(
  selectLocationsPagesState,
  (state) => state.loadedPages.has(page) && isEqual(state.filter, filter)
);

export const selectLocationsTotalPages = createSelector(
  selectLocationsPagesState,
  (state) => state.totalPages
);

export const selectLocationLoading = createSelector(
  selectLocationsPagesState,
  (state) => state.loading
);

export const selectLocationError = createSelector(
  selectLocationsPagesState,
  (state) => state.error
);
