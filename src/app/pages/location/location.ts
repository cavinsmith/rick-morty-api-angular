import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocationsFacade } from '../../store/facades/locations.facade';
import { Location as LocationModel } from '../../store/models/location.model';

import { Link } from '../../components/link/link';
import { Loader } from '../../components/loader/loader';
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';
import { Text } from '../../components/text/text';
import { Title } from '../../components/title/title';

import * as routesConstants from '../../constants/routes';
import { PaginatePipe } from '../../pipes/paginate';

@Component({
  selector: 'app-page-location',
  imports: [CommonModule, Title, Text, PaginatePipe, ShowcaseCharacters, Loader, Link],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location implements OnChanges, OnInit, OnDestroy {
  locationsFacade = inject(LocationsFacade);
  route = inject(ActivatedRoute);
  dimensionsRoute = routesConstants.ROUTE_DIMENSION;
  @Input() currentLocation = 55;
  @Input() id!: string;

  location$!: Observable<LocationModel | undefined>;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['id']) {
        this.currentLocation = +params['id'];
        this.updateLocation();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
