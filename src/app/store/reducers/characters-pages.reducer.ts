import { createReducer, on } from '@ngrx/store';
import { CharacterFilter } from 'rickmortyapi';
import { isEqual } from '../../utils/is-equal';
import * as CharactersPagesActions from '../actions/characters-pages.actions';
import { Character } from '../models/character.model';
import { PAGINATION_INITIAL_STATE, PaginationModel } from './episodes-pages.reducer';

export type CharactersPagesState = PaginationModel<Character, CharacterFilter>;

export const initialState: CharactersPagesState = {
  ...PAGINATION_INITIAL_STATE,
};

export const charactersPagesReducer = createReducer(
  initialState,

  on(CharactersPagesActions.loadCharactersPages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    CharactersPagesActions.loadCharactersPagesSuccess,
    (state, { page, characters, totalPages, totalItems, filter }) => {
      const currentState = isEqual(state.filter, filter) ? state : initialState;
      const newLoadedPages = new Set(currentState.loadedPages);
      newLoadedPages.add(page);

      return {
        ...currentState,
        loading: false,
        error: null,
        loadedPages: newLoadedPages,
        totalPages,
        totalItems,
        filter,
        pages: {
          ...currentState.pages,
          [page]: characters,
        },
      };
    },
  ),

  on(CharactersPagesActions.loadCharactersPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
