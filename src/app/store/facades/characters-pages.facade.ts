import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CharacterFilter } from 'rickmortyapi';
import { GenericPagesFacade } from './generic-pages.facade';

import * as CharactersPagesActions from '../actions/characters-pages.actions';
import { Character } from '../models/character.model';
import {
  selectCharactersPage,
  selectCharactersPageIsLoaded,
  selectCharactersTotalPagesAndItems,
} from '../selectors/characters-pages.selectors';

@Injectable({
  providedIn: 'root',
})
export class CharactersPagesFacade extends GenericPagesFacade<Character[], CharacterFilter> {
  protected loadAction = CharactersPagesActions.loadCharactersPages;
  protected selectPage = selectCharactersPage;
  protected selectTotalPagesAndItems = selectCharactersTotalPagesAndItems;
  protected selectPageIsLoaded = selectCharactersPageIsLoaded;

  constructor() {
    super(inject(Store));
  }
}
