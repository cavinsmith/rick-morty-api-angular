import { Component, inject } from '@angular/core';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { GenericListPagesComponent } from '../../components/generic-list-pages/generic-list-pages.component';
import { LocationFilter } from 'rickmortyapi';

import { Title } from '../../components/title/title';
import { Text } from '../../components/text/text';
import { Link } from '../../components/link/link';
import * as routeConstants from '../../constants/routes';

@Component({
  selector: 'app-page-locations',
  imports: [GenericListPagesComponent, Title, Text, Link],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export class ListLocations {
  locationRouterLink = routeConstants.ROUTE_LOCATION;
  locationsFacade = inject(LocationsPagesFacade);
  initialPage = 1;
  filter: LocationFilter = {};

  setDimension(dimension: string) {
    this.filter = {
      dimension,
    };
  }

  setLocationName(name: string) {
    this.filter = {
      name,
    };
  }
}
