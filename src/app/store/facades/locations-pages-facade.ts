import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocationFilter } from 'rickmortyapi';
import * as LocationsPagesActions from '../actions/locations-pages.actions';
import { Location } from '../models/location.model';
import {
  selectLocationsPage,
  selectLocationsPageIsLoaded,
  selectLocationsTotalPagesAndItems,
} from '../selectors/locations-pages.selectors';
import { GenericPagesFacade } from './generic-pages.facade';

@Injectable({
  providedIn: 'root',
})
export class LocationsPagesFacade extends GenericPagesFacade<Location[], LocationFilter> {
  protected loadAction = LocationsPagesActions.loadLocationsPages;
  protected selectPage = selectLocationsPage;
  protected selectTotalPagesAndItems = selectLocationsTotalPagesAndItems;
  protected selectPageIsLoaded = selectLocationsPageIsLoaded;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(store: Store) {
    super(store);
  }
}
