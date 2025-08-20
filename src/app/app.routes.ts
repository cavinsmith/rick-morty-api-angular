import { Routes } from '@angular/router';
import { ApiTest } from './components/api-test/api-test';
import { ListLocations } from './components/list-locations/list-locations';
import { ListEpisodes } from './components/list-episodes/list-episodes';
export const routes: Routes = [
  { path: '', component: ApiTest },
  { path: 'locations', component: ListLocations },
  { path: 'episodes', component: ListEpisodes }
  ];
