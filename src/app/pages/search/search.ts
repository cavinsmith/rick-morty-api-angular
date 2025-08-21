import { Component, inject } from '@angular/core';
import { Title } from '../../components/title/title';
import { Search as SearchComponent } from '../../components/search/search';
import { CharactersPagesFacade } from '../../store/facades/characters-pages.facade';
import { LocationsPagesFacade } from '../../store/facades/locations-pages-facade';
import { EpisodesPagesFacade } from '../../store/facades/episodes-pages.facade';

@Component({
  selector: 'app-page-search',
  imports: [Title, SearchComponent],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})

export class Search {
  charactersPagesFacade = inject(CharactersPagesFacade);
  locationsPagesFacade = inject(LocationsPagesFacade);
  episodesPagesFacade = inject(EpisodesPagesFacade);

}