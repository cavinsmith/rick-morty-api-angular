import { Component, inject } from '@angular/core';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { GenericListPagesComponent } from '../../components/generic-list-pages/generic-list-pages.component';
import { LocationFilter } from 'rickmortyapi';

@Component({
  selector: 'app-list-locations',
  imports: [GenericListPagesComponent],
  templateUrl: './list-locations.html',
  styleUrl: './list-locations.scss'
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
