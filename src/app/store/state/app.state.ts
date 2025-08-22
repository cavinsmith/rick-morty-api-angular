import { Character } from '../models/character.model';
// TODO: Move here state definition
import { CharactersPagesState } from '../reducers/characters-pages.reducer';
import { DimensionsState } from '../reducers/dimensions.reducer';
import { EpisodesPagesState } from '../reducers/episodes-pages.reducer';
import { EpisodesState } from '../reducers/episodes.reducer';
import { ErrorState } from '../reducers/error.reducer';
import { LocationsPagesState } from '../reducers/locations-pages.reducer';
import { LocationsState } from '../reducers/locations.reducer';

export type CharacterObject = Record<number, Character>;

export interface CharactersState {
  characters: CharacterObject;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  characters: CharactersState;
  charactersPages: CharactersPagesState;
  locations: LocationsState;
  locationsPages: LocationsPagesState;
  episodes: EpisodesState;
  episodesPages: EpisodesPagesState;
  dimensions: DimensionsState;
  error: ErrorState;
}
