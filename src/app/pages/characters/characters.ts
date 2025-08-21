import { Component, inject } from '@angular/core';
import { CharactersPagesFacade } from '../../store/facades/characters-pages.facade';
import { GenericListPagesComponent } from '../../components/generic-list-pages/generic-list-pages.component';
import { Title } from '../../components/title/title';
import { Text } from '../../components/text/text';
import { Link } from '../../components/link/link';
import * as routeConstants from '../../constants/routes';

@Component({
  selector: 'app-page-characters',
  imports: [GenericListPagesComponent, Title, Text, Link],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class ListCharacters {
  characterRouterLink = routeConstants.ROUTE_CHARACTER;
  charactersFacade = inject(CharactersPagesFacade);
}
