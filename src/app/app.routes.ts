import { Routes } from '@angular/router';
import { ApiTest } from './components/api-test/api-test';
import { ListLocations } from './pages/locations/locations';
import { ListEpisodes } from './pages/episodes/episodes';

import * as routesConstants from './constants/routes';

export const routes: Routes = [
  { path: routesConstants.ROUTE_API_TEST, component: ApiTest },
  { path: routesConstants.ROUTE_LOCATIONS, component: ListLocations },
  { path: routesConstants.ROUTE_EPISODES, component: ListEpisodes }
  ];
