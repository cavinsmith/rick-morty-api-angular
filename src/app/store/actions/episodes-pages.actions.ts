import { createAction, props } from '@ngrx/store';
import { Episode } from '../models/episode.model';
import { EpisodeFilter } from 'rickmortyapi';

export const loadEpisodesPages = createAction(
  '[EpisodesPages] Load Episodes Page',
  props<{ page: number; filter: EpisodeFilter }>(),
);

export const loadEpisodesPagesSuccess = createAction(
  '[EpisodesPages] Load Episodes Page Success',
  props<{
    page: number;
    episodes: Episode[];
    totalPages: number;
    totalItems: number;
    filter: EpisodeFilter;
  }>(),
);

export const loadEpisodesPageFailure = createAction(
  '[EpisodesPages] Load Episodes Page Failure',
  props<{ error: string }>(),
);
