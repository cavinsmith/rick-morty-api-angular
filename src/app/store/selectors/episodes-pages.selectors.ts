
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EpisodesPagesState } from '../reducers/episodes-pages.reducer'
import { isEqual } from 'lodash'; 
import { EpisodeFilter } from 'rickmortyapi';

export const selectEpisodesPagesState = createFeatureSelector<EpisodesPagesState>('episodesPages');


export const selectEpisodesPage = (page: number, filter: EpisodeFilter) => createSelector(
  selectEpisodesPagesState,
  (state) => isEqual(state.filter, filter) ? state.pages[page] : undefined
);

export const selectEpisodesPageIsLoaded = (page: number, filter: EpisodeFilter) => createSelector(
  selectEpisodesPagesState,
  (state) => state.loadedPages.has(page) && isEqual(state.filter, filter)
);

export const selectEpisodesTotalPages = createSelector(
  selectEpisodesPagesState,
  (state) => state.totalPages
);

/*
export const selectEpisodeLoading = createSelector(
  selectEpisodesPagesState,
  (state) => state.loading
);

export const selectEpisodeError = createSelector(
  selectEpisodesPagesState,
  (state) => state.error
);
*/