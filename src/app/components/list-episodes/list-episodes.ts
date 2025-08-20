import { Component, inject } from '@angular/core';
import { EpisodesPagesFacade } from '../../store/facades/episodes-pages.facade'
import { GenericListPagesComponent } from '../generic-list-pages/generic-list-pages.component';
import { EpisodeFilter } from 'rickmortyapi';

@Component({
  selector: 'app-list-episodes',
  imports: [GenericListPagesComponent],
  templateUrl: './list-episodes.html',
  styleUrl: './list-episodes.scss'
})
export class ListEpisodes {
  episodesFacade = inject(EpisodesPagesFacade);
  initialPage: number = 1;
  filter: EpisodeFilter = {};  

  setEpisodeName(name: string) {
    this.filter = {
      name
    }
  }
}
