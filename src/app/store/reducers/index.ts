import { ActionReducerMap } from '@ngrx/store';
import { charactersReducer } from './characters.reducers';
import { AppState } from '../state/app.state';

export const reducers: ActionReducerMap<AppState> = {
  characters: charactersReducer,
};