import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LocationsActions from '../actions/locations.actions';
import { Location } from '../models/location.model';
import { selectLocation } from '../selectors/locations.selectors';
import { GenericRecordFacade } from './generic-record.facade';

@Injectable({
  providedIn: 'root',
})
export class LocationsFacade extends GenericRecordFacade<Location> {
  protected loadAction = LocationsActions.loadLocation;
  protected selectRecord = selectLocation;

  constructor() {
    super(inject(Store));
  }
}
