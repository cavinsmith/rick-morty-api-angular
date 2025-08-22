import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterFilter } from 'rickmortyapi';
import { isEqual } from '../../utils/is-equal';
import { CharactersPagesState } from '../reducers/characters-pages.reducer';

export const selectCharactersPagesState =
  createFeatureSelector<CharactersPagesState>('charactersPages');

export const selectCharactersPage = (page: number, filter: CharacterFilter) =>
  createSelector(selectCharactersPagesState, (state) =>
    isEqual(state.filter, filter) ? state.pages[page] : undefined,
  );

export const selectCharactersPageIsLoaded = (page: number, filter: CharacterFilter) =>
  createSelector(
    selectCharactersPagesState,
    (state) => state.loadedPages.has(page) && isEqual(state.filter, filter),
  );

export const selectCharactersTotalPagesAndItems = createSelector(
  selectCharactersPagesState,
  (state) => ({
    totalPages: state.totalPages,
    totalItems: state.totalItems,
  }),
);
