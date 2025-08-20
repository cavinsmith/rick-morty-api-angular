import { Injectable } from '@angular/core';
import { GenericRecordFacade } from './generic-record.facade';
import { Store } from '@ngrx/store';
import * as EpisodesActions from '../actions/episodes.actions';
import { selectEpisode }  from '../selectors/episodes.selectors';
import { Episode } from  '../models/episode.model'

@Injectable({
  providedIn: 'root'
})
export class EpisodesFacade extends GenericRecordFacade<Episode> {
  protected loadAction = EpisodesActions.loadEpisode;
  protected selectRecord = selectEpisode

  constructor(store: Store) {
    super(store);
  }
}
