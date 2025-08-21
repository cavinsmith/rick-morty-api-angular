import { Component, inject } from '@angular/core';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { LocationFilter } from 'rickmortyapi';
import { Title } from "../../components/title/title";

@Component({
  selector: 'app-page-dimensions',
  imports: [Title],
  templateUrl: './dimensions.html',
  styleUrl: './dimensions.scss'
})
export class Dimensions {
  locationsFacade = inject(LocationsPagesFacade);
  currentPage: number = 1;
  filter: LocationFilter = {

  };

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
