import { Injectable } from '@angular/core';
import { GenericPagesFacade } from './generic-pages.facade';
import { Store } from '@ngrx/store';
import { EpisodeFilter } from 'rickmortyapi';

import * as EpisodesPagesActions from '../actions/episodes-pages.actions';
import { selectEpisodesPage, selectEpisodesTotalPages, selectEpisodesPageIsLoaded }  from '../selectors/episodes-pages.selectors';
import { Episode } from  '../models/episode.model'


@Injectable({
  providedIn: 'root'
})
export class EpisodesPagesFacade extends GenericPagesFacade<Episode[], EpisodeFilter> {
  protected loadAction = EpisodesPagesActions.loadEpisodesPages;
  protected selectPage = selectEpisodesPage;
  protected selectTotalPages = selectEpisodesTotalPages;
  protected selectPageIsLoaded = selectEpisodesPageIsLoaded;

  constructor(store: Store) {
    super(store);
  }
}
