import { Injectable, inject } from '@angular/core';
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

  constructor() {
    super(inject(Store));
  }
}
