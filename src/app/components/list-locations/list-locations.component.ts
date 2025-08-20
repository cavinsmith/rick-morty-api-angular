import { Component, inject } from '@angular/core';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { GenericListPagesComponent } from '../generic-list-pages/generic-list-pages.component';
import { LocationFilter } from 'rickmortyapi';

@Component({
  selector: 'app-list-locations',
  imports: [GenericListPagesComponent],
  templateUrl: './list-locations.component.html',
  styleUrl: './list-locations.component.scss'
})
export class ListLocations {
  locationsFacade = inject(LocationsPagesFacade);
  initialPage: number = 1;
  filter: LocationFilter = {};

  setDimension(dimension: string) {
    this.filter = {
      dimension
    }
  }

  setLocationName(name: string) {
    this.filter = {
      name
    }
  }
}
