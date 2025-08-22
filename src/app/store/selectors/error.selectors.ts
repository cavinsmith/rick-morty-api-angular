import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState } from '../reducers/error.reducer';

export const selectErrorState = createFeatureSelector<ErrorState>('error');

export const selectLastError = createSelector(selectErrorState, (state) => state.lastError);
