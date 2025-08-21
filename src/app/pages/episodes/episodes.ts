import { Component, inject } from '@angular/core';
import { EpisodesPagesFacade } from '../../store/facades/episodes-pages.facade'
import { GenericListPagesComponent } from '../../components/generic-list-pages/generic-list-pages.component';
import { EpisodeFilter } from 'rickmortyapi';

@Component({
  selector: 'app-page-episodes',
  imports: [GenericListPagesComponent],
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss'
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
