import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState } from '../state/app.state';
import { Character } from '../models/character.model';

export const selectCharactersPagesState = createFeatureSelector<CharactersState>('characters');

export const selectCharacters = createSelector(
  selectCharactersPagesState,
  (state) => state.characters,
);

export const selectCharacter = (id: number) =>
  createSelector(selectCharactersPagesState, (state) => state.characters[id]);

export const selectMultipleCharacters = (ids: number[]) =>
  createSelector(selectCharactersPagesState, (state) => {
    return ids.reduce((acc, id) => {
      acc.push({ ...state.characters[id] });
      return acc;
    }, [] as Character[]);
  });

export const selectCharacterLoading = createSelector(
  selectCharactersPagesState,
  (state) => state.loading,
);

export const selectCharacterError = createSelector(
  selectCharactersPagesState,
  (state) => state.error,
);
