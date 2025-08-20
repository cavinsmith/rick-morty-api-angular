import { ActionReducerMap } from '@ngrx/store';
import { charactersReducer } from './characters.reducers';
import { AppState } from '../state/app.state';
import { locationsReducer } from './locations.reducer';
import { locationsPagesReducer } from './locations-pages.reducer';

export const reducers: ActionReducerMap<AppState> = {
  characters: charactersReducer,
  locations: locationsReducer,
  locationsPages: locationsPagesReducer
};