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
import { EpisodesFacade } from '../../store/facades/episodes.facade';

import { Loader } from '../../components/loader/loader';
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';
import { Text } from '../../components/text/text';
import { Title } from '../../components/title/title';

import { PaginatePipe } from '../../pipes/paginate';
import { Episode as EpisodeModel } from '../../store/models/episode.model';

@Component({
  selector: 'app-page-episode',
  imports: [CommonModule, Title, Text, ShowcaseCharacters, PaginatePipe, Loader],
  templateUrl: './episode.html',
  styleUrl: './episode.scss',
})
export class Episode implements OnChanges, OnInit, OnDestroy {
  episodesFacade = inject(EpisodesFacade);
  route = inject(ActivatedRoute);
  @Input() currentEpisode = 55;
  @Input() id!: string;

  episode$!: Observable<EpisodeModel | undefined>;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['id']) {
        this.currentEpisode = +params['id'];
        this.updateEpisode();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentEpisode']) {
      this.updateEpisode();
    }
  }

  updateEpisode() {
    this.episode$ = this.episodesFacade.getRecord(this.currentEpisode);
  }
}
