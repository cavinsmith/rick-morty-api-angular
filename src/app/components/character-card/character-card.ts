
import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Character } from '../../store/models/character.model';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  @Input() character!: Character;
}