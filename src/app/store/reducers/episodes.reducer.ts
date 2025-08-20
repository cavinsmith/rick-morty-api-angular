// выглядит ок

import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from '../actions/episodes.actions';
import { Episode } from '../models/episode.model';

interface EpisodeObject {
  [id: number]: Episode;
}

export interface EpisodesState {
  episodes: EpisodeObject;
  loading: boolean;
  error: any;
}
export const initialState:  EpisodesState = {
  episodes: {},
  loading: false,
  error: null
};

export const episodesReducer = createReducer(
  initialState,

  on(EpisodeActions.loadEpisode, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EpisodeActions.loadEpisodeSuccess, (state, { episode }) => {
    return {
      ...state,
      episodes: {
        ...state.episodes,
        [episode.id]: episode,
      },
      loading: false,
      error: null,      
    };
  }),


  on(EpisodeActions.loadEpisodesSuccess, (state, { episodes }) => {
    return {
      ...state,
      episodes: {
        ...state.episodes,
        ...episodes.reduce((acc: EpisodeObject, item: Episode) => {
          acc[item.id] = item;
          return acc;
        }, {}), 
      },
      loading: false,
      error: null,
    };
  }),

  on(EpisodeActions.loadEpisodeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
