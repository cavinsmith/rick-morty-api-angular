import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationFilter } from 'rickmortyapi';
import { isEqual } from '../../utils/is-equal';
import { LocationsPagesState } from '../reducers/locations-pages.reducer';

export const selectLocationsPagesState =
  createFeatureSelector<LocationsPagesState>('locationsPages');

export const selectLocationsPage = (page: number, filter: LocationFilter) =>
  createSelector(selectLocationsPagesState, (state) =>
    isEqual(state.filter, filter) ? state.pages[page] : undefined,
  );

export const selectLocationsPageIsLoaded = (page: number, filter: LocationFilter) =>
  createSelector(
    selectLocationsPagesState,
    (state) => state.loadedPages.has(page) && isEqual(state.filter, filter),
  );

export const selectLocationsTotalPagesAndItems = createSelector(
  selectLocationsPagesState,
  (state) => ({
    totalPages: state.totalPages,
    totalItems: state.totalItems,
  }),
);

export const selectLocationLoading = createSelector(
  selectLocationsPagesState,
  (state) => state.loading,
);

export const selectLocationError = createSelector(
  selectLocationsPagesState,
  (state) => state.error,
);
