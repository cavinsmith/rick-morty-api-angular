import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';
import { CharacterFilter } from 'rickmortyapi';

export const loadCharactersPages = createAction(
  '[CharactersPages] Load Characters Page',
  props<{ page: number; filter: CharacterFilter }>(),
);

export const loadCharactersPagesSuccess = createAction(
  '[CharactersPages] Load Characters Page Success',
  props<{
    page: number;
    characters: Character[];
    totalPages: number;
    totalItems: number;
    filter: CharacterFilter;
  }>(),
);

export const loadCharactersPageFailure = createAction(
  '[CharactersPages] Load Characters Page Failure',
  props<{ error: string }>(),
);
