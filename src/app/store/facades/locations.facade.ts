import { Injectable } from '@angular/core';
import { GenericRecordFacade } from './generic-record.facade';
import { Store } from '@ngrx/store';
import * as LocationsActions from '../actions/locations.actions';
import { selectLocation }  from '../selectors/locations.selectors';
import { Location } from  '../models/location.model'

@Injectable({
  providedIn: 'root'
})
export class LocationsFacade extends GenericRecordFacade<Location> {
  protected loadAction = LocationsActions.loadLocation;
  protected selectRecord = selectLocation

  constructor(store: Store) {
    super(store);
  }
}
