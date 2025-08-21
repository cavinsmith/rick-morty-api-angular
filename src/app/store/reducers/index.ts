import { ActionReducerMap } from '@ngrx/store';
import { charactersReducer } from './characters.reducers';
import { AppState } from '../state/app.state';
import { locationsReducer } from './locations.reducer';
import { locationsPagesReducer } from './locations-pages.reducer';
import { episodesPagesReducer } from './episodes-pages.reducer';
import { episodesReducer } from './episodes.reducer';
import { charactersPagesReducer } from './characters-pages.reducer';
import { dimensionsReducer } from './dimensions.reducer';

export const reducers: ActionReducerMap<AppState> = {
  characters: charactersReducer,
  charactersPages: charactersPagesReducer,
  locations: locationsReducer,
  dimensions: dimensionsReducer,
  locationsPages: locationsPagesReducer,
  episodes: episodesReducer,
  episodesPages: episodesPagesReducer,
};
