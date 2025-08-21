
import { Component, inject, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EpisodesFacade } from '../../store/facades/episodes.facade';
import { Observable } from 'rxjs';

import { Title } from "../../components/title/title";
import { Text } from "../../components/text/text";
import { ShowcaseCharacters } from '../../components/showcase-characters/showcase-characters';

import { Episode as EpisodeModel } from '../../store/models/episode.model';
import { PaginatePipe } from '../../pipes/paginate';

@Component({
  selector: 'app-page-episode',
  imports: [CommonModule, Title, Text, ShowcaseCharacters, PaginatePipe],
  templateUrl: './episode.html',
  styleUrl: './episode.scss',
})
export class Episode implements OnChanges, OnInit {
  episodesFacade = inject(EpisodesFacade);
  route = inject(ActivatedRoute);

  @Input() currentEpisode: number = 55;
  @Input() id!: string;

  episode$!: Observable<EpisodeModel>;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentEpisode = +params['id'];
        this.updateEpisode();
      }
    });
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