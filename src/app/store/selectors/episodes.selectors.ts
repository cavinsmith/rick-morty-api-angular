
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EpisodesState } from '../reducers/episodes.reducer';

export const selectEpisodesPagesState = createFeatureSelector<EpisodesState>('episodes');

export const selectEpisodes = createSelector(
  selectEpisodesPagesState,
  (state) => state.episodes
);

export const selectEpisode = (id: number) => createSelector(
  selectEpisodesPagesState,
  (state) => state.episodes[id]
);

export const selectEpisodeLoading = createSelector(
  selectEpisodesPagesState,
  (state) => state.loading
);

export const selectEpisodeError = createSelector(
  selectEpisodesPagesState,
  (state) => state.error
);
