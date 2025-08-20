import { Character } from "../models/character.model";

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
}