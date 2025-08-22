import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { charactersPagesReducer } from './characters-pages.reducer';
import { charactersReducer } from './characters.reducers';
import { dimensionsReducer } from './dimensions.reducer';
import { episodesPagesReducer } from './episodes-pages.reducer';
import { episodesReducer } from './episodes.reducer';
import { errorReducer } from './error.reducer';
import { locationsPagesReducer } from './locations-pages.reducer';
import { locationsReducer } from './locations.reducer';

export const reducers: ActionReducerMap<AppState> = {
  characters: charactersReducer,
  charactersPages: charactersPagesReducer,
  locations: locationsReducer,
  dimensions: dimensionsReducer,
  locationsPages: locationsPagesReducer,
  episodes: episodesReducer,
  episodesPages: episodesPagesReducer,
  error: errorReducer,
};
