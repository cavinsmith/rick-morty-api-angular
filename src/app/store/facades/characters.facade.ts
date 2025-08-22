import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CharactersActions from '../actions/characters.actions';
import { Character } from '../models/character.model';
import { selectCharacter, selectMultipleCharacters } from '../selectors/characters.selectors';
import { GenericRecordFacade } from './generic-record.facade';

@Injectable({
  providedIn: 'root',
})
export class CharactersFacade extends GenericRecordFacade<Character> {
  protected loadAction = CharactersActions.loadCharacter;
  protected override loadManyAction = CharactersActions.loadCharacters;
  protected selectRecord = selectCharacter;
  protected override selectManyRecords = selectMultipleCharacters;

  constructor() {
    super(inject(Store));
  }
}
