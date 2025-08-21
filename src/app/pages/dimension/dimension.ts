
import { Component, inject, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap, take } from 'rxjs';

import { Title } from "../../components/title/title";
import { Text } from "../../components/text/text";
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';

import { ExtractIdsPipe } from "../../pipes/extract-ids";
import { LocationsFacade } from '../../store/facades/locations.facade';
import { Location } from '../../store/models/location.model';
import { Character } from '../../store/models/character.model';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';

@Component({
  selector: 'app-page-dimension',
  imports: [CommonModule, Title, Text, ExtractIdsPipe, ShowcaseCharacters],
  templateUrl: './dimension.html',
  styleUrl: './dimension.scss',
})
export class Dimension implements OnChanges, OnInit {
  locationsFacade = inject(LocationsFacade);
  locationsPagesFacade = inject(LocationsPagesFacade);
  route = inject(ActivatedRoute);

  @Input() currentLocation!: number;
  @Input() id!: string;
  initialPage: number = 1;

  location$!: Observable<Location>;
  locations$!: Observable<any>;
  locationsTotalPages$!: Observable<any>;

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
    this.location$ = this.locationsFacade.getRecord(this.currentLocation);


// Новый observable, зависящий от dimension
    this.locations$ = this.location$.pipe(
      filter((location): location is Location => !!location && !!location.dimension),
      switchMap(location => this.locationsPagesFacade.getPage(this.initialPage, { dimension: location.dimension }))
    );

    this.locationsTotalPages$ = this.location$.pipe(
      filter((location): location is Location => !!location && !!location.dimension),
      switchMap(location => this.locationsPagesFacade.getTotalPagesAndItems())
    );
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
