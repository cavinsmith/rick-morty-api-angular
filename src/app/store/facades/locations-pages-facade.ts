import { Injectable } from '@angular/core';
import { GenericPagesFacade } from './generic-pages.facade';
import { Store } from '@ngrx/store';
import * as LocationsPagesActions from '../actions/locations-pages.actions';
import { selectLocationsPage, selectLocationsTotalPagesAndItems, selectLocationsPageIsLoaded }  from '../selectors/locations-pages.selectors';
import { Location } from  '../models/location.model'
import { LocationFilter } from 'rickmortyapi';

@Injectable({
  providedIn: 'root'
})
export class LocationsPagesFacade extends GenericPagesFacade<Location[], LocationFilter> {
  protected loadAction = LocationsPagesActions.loadLocationsPages;
  protected selectPage = selectLocationsPage;
  protected selectTotalPagesAndItems = selectLocationsTotalPagesAndItems;
  protected selectPageIsLoaded = selectLocationsPageIsLoaded;

  constructor(store: Store) {
    super(store);
  }
}
