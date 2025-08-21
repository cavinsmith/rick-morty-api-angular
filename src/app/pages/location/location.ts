
import { Component, inject, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LocationsFacade } from '../../store/facades/locations.facade';
import { Observable } from 'rxjs';

import { Title } from "../../components/title/title";
import { Text } from "../../components/text/text";
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';

import { PaginatePipe } from "../../pipes/paginate";

@Component({
  selector: 'app-page-location',
  imports: [CommonModule, Title, Text, PaginatePipe, ShowcaseCharacters],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location implements OnChanges, OnInit {
  locationsFacade = inject(LocationsFacade);
  route = inject(ActivatedRoute);

  @Input() currentLocation: number = 55;
  @Input() id!: string;

  location$!: Observable<any>;

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
  }
}