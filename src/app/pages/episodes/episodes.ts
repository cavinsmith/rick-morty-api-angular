import { Component, inject } from '@angular/core';
import { EpisodesPagesFacade } from '../../store/facades/episodes-pages.facade'
import { GenericListPagesComponent } from '../../components/generic-list-pages/generic-list-pages.component';
import { EpisodeFilter } from 'rickmortyapi';
import { Title } from '../../components/title/title';
import { Text } from '../../components/text/text';
import { Link } from '../../components/link/link';
import * as routeConstants from '../../constants/routes';

@Component({
  selector: 'app-page-episodes',
  imports: [GenericListPagesComponent, Title, Text, Link],
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss'
})
export class ListEpisodes {
  episodesFacade = inject(EpisodesPagesFacade);
  initialPage: number = 1;
  filter: EpisodeFilter = {};
  episodeRouterLink = routeConstants.ROUTE_EPISODE;
}
