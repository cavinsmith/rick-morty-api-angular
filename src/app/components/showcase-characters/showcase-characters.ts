import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Observable } from 'rxjs';

import { Character } from '../../store/models/character.model';
import { CharacterCard } from '../character-card/character-card';

@Component({
  selector: 'showcase-characters',
  imports: [CommonModule, CharacterCard, MatPaginatorModule],
  templateUrl: './showcase-characters.html',
  styleUrl: './showcase-characters.scss',
})
export class ShowcaseCharacters implements OnInit {
  charactersFacade = inject(CharactersFacade);
  currentPage: number = 1;
  @Input() characterIds: string[][] = [];
  totalElements!: number;

  characters$!: Observable<(Character)[]>

  ngOnInit(): void {
    this.updateCharacters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterIds']) {
      this.currentPage = 1;
      this.totalElements = this.characterIds.map(ids => ids.length).reduce((acc, val) => acc + val, 0);
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updateCharacters();
  }

  updateCharacters() {
    const extractedIds = this.characterIds[this.currentPage - 1].map(url => parseInt(url.split('/').slice(-1)[0]));
    this.characters$ = this.charactersFacade.getRecords(extractedIds);
  }

}