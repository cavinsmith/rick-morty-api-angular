import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { map, Observable } from 'rxjs';
import { Character } from '../../store/models/character.model';

@Component({
  selector: 'app-page-characters',
  imports: [CommonModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss'
})
export class CharactersPage {
}
