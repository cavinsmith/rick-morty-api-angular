import { Routes } from '@angular/router';
import { ApiTest } from './components/api-test/api-test';
import { ListLocations } from './components/list-locations/list-locations';
import { ListEpisodes } from './components/list-episodes/list-episodes';

import * as routesConstants from './constants/routes';

export const routes: Routes = [
  { path: routesConstants.ROUTE_API_TEST, component: ApiTest },
  { path: routesConstants.ROUTE_LOCATIONS, component: ListLocations },
  { path: routesConstants.ROUTE_EPISODES, component: ListEpisodes }
  ];
