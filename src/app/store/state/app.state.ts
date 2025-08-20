import { Character } from "../models/character.model";
// TODO: Move here state definition
import { LocationsState } from "../reducers/locations.reducer";
import { LocationsPagesState } from "../reducers/locations-pages.reducer";

export interface CharacterObject {
  [id: number]: Character;
}

export interface CharactersState {
  characters: CharacterObject;
  loading: boolean;
  error: any;
}

export interface AppState {
  characters: CharactersState;
  locations: LocationsState;
  locationsPages: LocationsPagesState;
}