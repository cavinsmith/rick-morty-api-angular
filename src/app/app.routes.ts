import { Routes } from '@angular/router';
// import { ApiTest } from './components/api-test/api-test';
import { ListLocations } from './pages/locations/locations';
import { ListEpisodes } from './pages/episodes/episodes';
import { ListCharacters } from './pages/characters/characters';
import { Character } from './pages/character/character';
import { Location } from './pages/location/location';
import { Episode } from './pages/episode/episode';
import { Search } from './pages/search/search';

import * as routesConstants from './constants/routes';

export const routes: Routes = [
  { path: routesConstants.ROUTE_SEARCH, component: Search },
  { path: routesConstants.ROUTE_LOCATION_ROUTER, component: Location },
  { path: routesConstants.ROUTE_EPISODE_ROUTER, component: Episode },
  { path: routesConstants.ROUTE_LOCATIONS, component: ListLocations },
  { path: routesConstants.ROUTE_EPISODES, component: ListEpisodes },
  { path: routesConstants.ROUTE_CHARACTERS, component: ListCharacters },
  { path: routesConstants.ROUTE_CHARACTER_ROUTER, component: Character },
  
];
