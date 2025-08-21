
import { Component, inject, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';

import { Title } from "../../components/title/title";
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';

import { LocationsFacade } from '../../store/facades/locations.facade';
import { Location } from '../../store/models/location.model';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { DimensionsFacade } from '../../store/facades/dimensions.facade';

@Component({
  selector: 'app-page-dimension',
  imports: [CommonModule, Title, ShowcaseCharacters],
  templateUrl: './dimension.html',
  styleUrl: './dimension.scss',
})
export class Dimension implements OnChanges, OnInit {
  locationsFacade = inject(LocationsFacade);
  locationsPagesFacade = inject(LocationsPagesFacade);
  dimensionsFacade = inject(DimensionsFacade);
  route = inject(ActivatedRoute);

  @Input() currentLocation!: number;
  @Input() id!: string;
  initialPage: number = 1;
  itemsPerPage: number = 20;

  location$!: Observable<Location>;
  locations$!: Observable<any>;
  locationsTotalPages$!: Observable<any>;
  dimension$!: Observable<any>;
  paginatedData$!: Observable<any>;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentLocation = +params['id'];
        this.updateLocation();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentLocation']) {
      this.updateLocation();
    }
  }

  updateLocation() {
    this.location$ = this.locationsFacade.getRecord(this.currentLocation)
    this.dimension$ = this.location$.pipe(
      filter((location): location is Location => !!location && !!location.dimension),
      switchMap(location => this.dimensionsFacade.getAllCharactersInDimension(location.dimension))
    );


/*
    this.locationsTotalPages$ = this.location$.pipe(
      filter((location): location is Location => !!location && !!location.dimension),
      switchMap(location => this.locationsPagesFacade.getTotalPagesAndItems())
    );
*/
  //  this.dimension$ = this.dimensionsFacade.getAllCharactersInDimension(this.currentLocation.toString())
  }

  previousPage() {
    this.initialPage--;
    this.updateLocation();
  }

  nextPage() {
    this.initialPage++
    this.updateLocation();    
  }
}
