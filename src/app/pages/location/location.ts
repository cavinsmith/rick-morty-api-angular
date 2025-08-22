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
import { LocationsFacade } from '../../store/facades/locations.facade';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location as LocationModel } from '../../store/models/location.model';

import { Title } from '../../components/title/title';
import { Text } from '../../components/text/text';
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';

import { PaginatePipe } from '../../pipes/paginate';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-page-location',
  imports: [CommonModule, Title, Text, PaginatePipe, ShowcaseCharacters, Loader],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location implements OnChanges, OnInit, OnDestroy {
  locationsFacade = inject(LocationsFacade);
  route = inject(ActivatedRoute);

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
