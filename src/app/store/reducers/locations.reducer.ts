// выглядит ок

import { createFeature, createReducer, on } from '@ngrx/store';
import * as LocationActions from '../actions/locations.actions';
import { Location } from '../models/location.model';

interface LocationObject {
  [id: number]: Location;
}

export interface LocationsState {
  locations: LocationObject;
  loading: boolean;
  error: any;
}
export const initialState:  LocationsState = {
  locations: {},
  loading: false,
  error: null
};

export const locationsReducer = createReducer(
  initialState,

  on(LocationActions.loadLocation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(LocationActions.loadLocationSuccess, (state, { location }) => {
    return {
      ...state,
      locations: {
        ...state.locations,
        [location.id]: location,
      },
      loading: false,
      error: null,      
    };
  }),


  on(LocationActions.loadLocationsSuccess, (state, { locations }) => {
    return {
      ...state,
      locations: {
        ...state.locations,
        ...locations.reduce((acc: LocationObject, item: Location) => {
          acc[item.id] = item;
          return acc;
        }, {}), 
      },
      loading: false,
      error: null,
    };
  }),

  on(LocationActions.loadLocationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
