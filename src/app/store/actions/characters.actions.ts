import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';

export const loadCharacter = createAction(
  '[Characters] Load Character',
  props<{ id: number }>()
);

export const loadCharacters = createAction(
  '[Characters] Load Characters',
  props<{ ids: number[] }>()
);


export const loadCharacterSuccess = createAction(
  '[Characters] Load Character Success',
  props<{ character: Character }>()
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characters: Character[] }>()
);

export const loadCharacterFailure = createAction(
  '[Characters] Load Character Failure',
  props<{ error: string }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: string }>()
);

