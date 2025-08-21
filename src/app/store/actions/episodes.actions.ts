import { createAction, props } from '@ngrx/store';
import { Episode } from '../models/episode.model';

export const loadEpisode = createAction('[Episodes] Load Episode', props<{ id: number }>());

export const loadEpisodeSuccess = createAction(
  '[Episodes] Load Episode Success',
  props<{ episode: Episode }>(),
);

export const loadEpisodesSuccess = createAction(
  '[Episodes] Load Episodes Success',
  props<{ episodes: Episode[] }>(),
);

export const loadEpisodeFailure = createAction(
  '[Episodes] Load Episode Failure',
  props<{ error: string }>(),
);
