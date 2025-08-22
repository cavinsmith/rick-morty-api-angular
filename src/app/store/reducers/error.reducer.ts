import { createReducer, on } from '@ngrx/store';
// Import all actions
import * as CharacterPageActions from '../actions/characters-pages.actions';
import * as CharacterActions from '../actions/characters.actions';
import * as DimensionActions from '../actions/dimensions.actions';
import * as EpisodesPagesActions from '../actions/episodes-pages.actions';
import * as EpisodeActions from '../actions/episodes.actions';
import * as LocationsPagesActions from '../actions/locations-pages.actions';
import * as LocationActions from '../actions/locations.actions';

export interface ErrorState {
  lastError: string | null;
}
export const initialState: ErrorState = {
  lastError: null,
};

export const errorReducer = createReducer(
  initialState,

  // Catch all known errors
  on(
    EpisodeActions.loadEpisodeFailure,
    EpisodesPagesActions.loadEpisodesPageFailure,
    CharacterPageActions.loadCharactersPageFailure,
    CharacterActions.loadCharacterFailure,
    CharacterActions.loadCharactersFailure,
    LocationActions.loadLocationFailure,
    LocationsPagesActions.loadLocationsPageFailure,
    DimensionActions.loadAllCharactersInDimensionFailure,
    DimensionActions.loadAllDimensionsFailure,
    (state, { error }) => ({
      lastError: error,
    }),
  ),
);
