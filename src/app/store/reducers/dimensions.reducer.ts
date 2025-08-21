// выглядит ок

import { createReducer, on } from '@ngrx/store';
import * as DimensionActions from '../actions/dimensions.actions';
import { Dimension } from '../models/dimension.model';

interface DimensionObject {  
  [id: string]: Dimension;
}

export interface DimensionsState {
  dimensions: DimensionObject;
  allDimensionNames: {
    name: string[];
    id: number;
  }[];
  loading: boolean;
  error: any;
}
export const initialState: DimensionsState = {
  dimensions: {},
  allDimensionNames: [],
  loading: false,
  error: null
};

export const dimensionsReducer = createReducer(
  initialState,

  on(DimensionActions.loadAllCharactersInDimension, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DimensionActions.loadAllCharactersInDimensionSuccess, (state, { dimension, residents }) => {
    const residentsPaginated = residents.reduce((acc: string[][], value: string, i: number) => {
            acc[Math.floor(i / 6)] = acc[Math.floor(i / 6)] || [];
            acc[Math.floor(i / 6)].push(value);
            return acc;
          }, [])
    return {
      ...state,
      dimensions: {
        ...state.dimensions,
        [dimension]: {
          name: dimension,
          residents: residentsPaginated
        },
      },
      loading: false,
      error: null,      
    };
  }),

  on(DimensionActions.loadAllCharactersInDimensionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
