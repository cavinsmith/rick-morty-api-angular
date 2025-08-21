import { createAction, props } from '@ngrx/store';
import { Location } from '../models/location.model';

export const loadAllCharactersInDimension = createAction(
  '[Characters] Load All Characters In Dimension',
  props<{ dimension: string }>()
);

export const loadAllCharactersInDimensionSuccess = createAction(
  '[Characters] Load All Characters In Dimension Success',
  props<{ dimension: string, residents: string[], locations: Location[] }>()
);

export const loadAllCharactersInDimensionFailure = createAction(
  '[Characters] Load All Characters In Dimension Failure',
  props<{ error: string }>()
);

export const loadAllDimensions = createAction(
  '[Characters] Load All Dimensions'
);

export const loadAllDimensionsSuccess = createAction(
  '[Characters] Load All Dimensions Success',
  props<{ dimensions: { name: string; id: number }[] }>()
);

export const loadAllDimensionsFailure = createAction(
  '[Characters] Load All Dimensions Failure',
  props<{ error: string }>()
);
