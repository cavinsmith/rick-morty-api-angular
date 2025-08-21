import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EpisodeFilter } from 'rickmortyapi';
import { GenericPagesFacade } from './generic-pages.facade';

import * as EpisodesPagesActions from '../actions/episodes-pages.actions';
import { Episode } from '../models/episode.model';
import {
  selectEpisodesPage,
  selectEpisodesPageIsLoaded,
  selectEpisodesTotalPagesAndItems,
} from '../selectors/episodes-pages.selectors';

@Injectable({
  providedIn: 'root',
})
export class EpisodesPagesFacade extends GenericPagesFacade<Episode[], EpisodeFilter> {
  protected loadAction = EpisodesPagesActions.loadEpisodesPages;
  protected selectPage = selectEpisodesPage;
  protected selectTotalPagesAndItems = selectEpisodesTotalPagesAndItems;
  protected selectPageIsLoaded = selectEpisodesPageIsLoaded;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(store: Store) {
    super(store);
  }
}
