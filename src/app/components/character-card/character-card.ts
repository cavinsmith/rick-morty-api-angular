import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as routesConstants from '../../constants/routes';
import { ExtractIdPipe } from '../../pipes/extract-id';
import { Character } from '../../store/models/character.model';
import { Link } from '../link/link';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule, MatButtonModule, MatCardModule, ExtractIdPipe, Link],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  @Input() character!: Character;
  locationRouterLink = routesConstants.ROUTE_LOCATION;
}
