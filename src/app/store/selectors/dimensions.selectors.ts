
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DimensionsState } from '../reducers/dimensions.reducer';

export const selectDimensionsState = createFeatureSelector<DimensionsState>('dimensions');

export const selectDimensions = createSelector(
  selectDimensionsState,
  (state) => state.dimensions
);

export const selectDimension = (name: string) => createSelector(
  selectDimensionsState,
  (state) => state.dimensions[name]
);

export const selectDimensionLoading = createSelector(
  selectDimensionsState,
  (state) => state.loading
);

export const selectDimensionError = createSelector(
  selectDimensionsState,
  (state) => state.error
);

export const selectDimensionNames = createSelector(
  selectDimensionsState,
  (state) => state.allDimensionNames
);