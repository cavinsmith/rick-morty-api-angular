import { Injectable } from '@angular/core';
import { GenericRecordFacade } from './generic-record.facade';
import { Store } from '@ngrx/store';
import * as CharactersActions from '../actions/characters.actions';
import { selectCharacter, selectMultipleCharacters }  from '../selectors/characters.selectors';
import { Character } from  '../models/character.model'

@Injectable({
  providedIn: 'root'
})
export class CharactersFacade extends GenericRecordFacade<Character> {
  protected loadAction = CharactersActions.loadCharacter;
  protected loadManyAction = CharactersActions.loadCharacters;
  protected selectRecord = selectCharacter;
  protected selectManyRecords = selectMultipleCharacters;

  constructor(store: Store) {
    super(store);
  }
}
