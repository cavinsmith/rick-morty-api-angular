import { Injectable } from '@angular/core';
import { GenericPagesFacade } from './generic-pages.facade';
import { Store } from '@ngrx/store';
import { CharacterFilter } from 'rickmortyapi';

import * as CharactersPagesActions from '../actions/characters-pages.actions';
import { selectCharactersPage, selectCharactersTotalPagesAndItems, selectCharactersPageIsLoaded }  from '../selectors/characters-pages.selectors';
import { Character } from  '../models/character.model'


@Injectable({
  providedIn: 'root'
})
export class CharactersPagesFacade extends GenericPagesFacade<Character[], CharacterFilter> {
  protected loadAction = CharactersPagesActions.loadCharactersPages;
  protected selectPage = selectCharactersPage;
  protected selectTotalPagesAndItems = selectCharactersTotalPagesAndItems;
  protected selectPageIsLoaded = selectCharactersPageIsLoaded;

  constructor(store: Store) {
    super(store);
  }
}