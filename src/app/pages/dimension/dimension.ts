import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { Title } from '../../components/title/title';
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';

import { LocationsFacade } from '../../store/facades/locations.facade';
import { Location } from '../../store/models/location.model';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { DimensionsFacade } from '../../store/facades/dimensions.facade';
import { Dimension as DimensionModel } from '../../store/models/dimension.model';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-page-dimension',
  imports: [CommonModule, Title, ShowcaseCharacters, Loader],
  templateUrl: './dimension.html',
  styleUrl: './dimension.scss',
})
export class Dimension implements OnChanges, OnInit, OnDestroy {
  locationsFacade = inject(LocationsFacade);
  locationsPagesFacade = inject(LocationsPagesFacade);
  dimensionsFacade = inject(DimensionsFacade);
  route = inject(ActivatedRoute);

  @Input() currentLocation!: number;
  @Input() id!: string;
  initialPage = 1;
  itemsPerPage = 20;

  location$!: Observable<Location | undefined>;
  locations$!: Observable<Location[] | undefined>;
  locationsTotalPages$!: Observable<{ totalPages: number; totalItems: number }>;
  dimension$!: Observable<DimensionModel | undefined>;
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
    this.dimension$ = this.location$.pipe(
      filter((location): location is Location => !!location && !!location.dimension),
      switchMap((location) =>
        this.dimensionsFacade.getAllCharactersInDimension(location.dimension),
      ),
    );
  }
}
