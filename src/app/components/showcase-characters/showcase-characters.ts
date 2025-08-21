
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Observable } from 'rxjs';

import { Character } from '../../store/models/character.model';
import { CharacterCard } from '../character-card/character-card';

@Component({
  selector: 'showcase-characters',
  imports: [CommonModule, CharacterCard, ],
  templateUrl: './showcase-characters.html',
  styleUrl: './showcase-characters.scss',
})
export class ShowcaseCharacters implements OnInit {
  charactersFacade = inject(CharactersFacade);
  @Input() characterIds: number[] = [];

  characters$!: Observable<(Character)[]>

  ngOnInit(): void {
    this.characters$ = this.charactersFacade.getRecords(this.characterIds);
  }

}