import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as EpisodesActions from '../actions/episodes.actions';
import { Episode } from '../models/episode.model';
import { selectEpisode } from '../selectors/episodes.selectors';
import { GenericRecordFacade } from './generic-record.facade';

@Injectable({
  providedIn: 'root',
})
export class EpisodesFacade extends GenericRecordFacade<Episode> {
  protected loadAction = EpisodesActions.loadEpisode;
  protected selectRecord = selectEpisode;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(store: Store) {
    super(store);
  }
}
