import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from '../actions/characters.actions';
import { Character } from '../models/character.model';
import { CharacterObject, CharactersState } from '../state/app.state';

export const initialState: CharactersState = {
  characters: {},
  loading: false,
  error: null,
};

export const charactersReducer = createReducer(
  initialState,

  on(CharacterActions.loadCharacter, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CharacterActions.loadCharacterSuccess, (state, { character }) => {
    return {
      ...state,
      characters: {
        ...state.characters,
        [character.id]: character,
      },
      loading: false,
      error: null,
    };
  }),

  on(CharacterActions.loadCharactersSuccess, (state, { characters }) => {
    return {
      ...state,
      characters: {
        ...state.characters,
        ...characters.reduce((acc: CharacterObject, item: Character) => {
          acc[item.id] = item;
          return acc;
        }, {}),
      },
      loading: false,
      error: null,
    };
  }),

  on(CharacterActions.loadCharacterFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
