// выглядит ок

import { createReducer, on } from '@ngrx/store';
import { isEqual } from 'lodash';
import { EpisodeFilter } from 'rickmortyapi';
import * as EpisodesPagesActions from '../actions/episodes-pages.actions';
import { Episode } from '../models/episode.model';

export interface PaginationModel<T, F> {
  loadedPages: Set<number>;
  pages: Record<number, T[]>;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  filter: F;
  error: any;
}

export const PAGINATION_INITIAL_STATE = {
  loadedPages: new Set<number>(),
  pages: {},
  totalPages: 0,
  totalItems: 0,
  loading: false,
  filter: {},
  error: null,
};

export interface EpisodesPagesState extends PaginationModel<Episode, EpisodeFilter> {}

export const initialState: EpisodesPagesState = {
  ...PAGINATION_INITIAL_STATE,
};

export const episodesPagesReducer = createReducer(
  initialState,

  on(EpisodesPagesActions.loadEpisodesPages, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    EpisodesPagesActions.loadEpisodesPagesSuccess,
    (state, { page, episodes, totalPages, totalItems, filter }) => {
      const currentState = isEqual(state.filter, filter) ? state : initialState;
      const newLoadedPages = new Set(currentState.loadedPages);
      newLoadedPages.add(page);

      return {
        ...currentState,
        loading: false,
        error: null,
        loadedPages: newLoadedPages,
        totalPages,
        totalItems,
        filter,
        pages: {
          ...currentState.pages,
          [page]: episodes,
        },
      };
    },
  ),

  on(EpisodesPagesActions.loadEpisodesPageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
