// выглядит ок

import { createFeature, createReducer, on } from '@ngrx/store';
import * as LocationsPagesActions from '../actions/locations-pages.actions';
import { Location } from '../models/location.model';
import { LocationFilter } from 'rickmortyapi';
import { isEqual } from 'lodash';

export interface PaginationModel<T, F> {
  loadedPages: Set<number>;
  pages: { [key: number]: T[] };
  totalPages: number;
  loading: boolean;
  filter: F;
  error: any;
}

export const PAGINATION_INITIAL_STATE = {
  loadedPages: new Set<number>(),
  pages: {},
  totalPages: 0,
  loading: false,
  filter: {},
  error: null,
}

export interface LocationsPagesState extends PaginationModel<Location, LocationFilter> {}

export const initialState: LocationsPagesState = {
  ...PAGINATION_INITIAL_STATE 
};

export const locationsPagesReducer = createReducer(
  initialState,

  on(LocationsPagesActions.loadLocationsPages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LocationsPagesActions.loadLocationsPagesSuccess, (state, { page, locations, totalPages, filter }) => {
    const currentState = isEqual(state.filter, filter) ? state : initialState;
    const newLoadedPages = new Set(currentState.loadedPages);
    newLoadedPages.add(page);

    return {
      ...currentState,
      loading: false,
      error: null,
      loadedPages: newLoadedPages,
      totalPages,
      filter,
      pages: {
        ...currentState.pages,
        [page]: locations,
      },
    };
  }),

  on(LocationsPagesActions.loadLocationsPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
