import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { CharactersFacade } from '../../store/facades/characters.facade';

import { Character } from '../../store/models/character.model';
import { CharacterCard } from '../character-card/character-card';
import { Loader } from '../loader/loader';
import { Text } from '../text/text';

@Component({
  selector: 'app-showcase-characters',
  imports: [CommonModule, CharacterCard, MatPaginatorModule, Loader, Text],
  templateUrl: './showcase-characters.html',
  styleUrl: './showcase-characters.scss',
})
export class ShowcaseCharacters implements OnInit, OnChanges {
  charactersFacade = inject(CharactersFacade);
  currentPage = 1;
  @Input() characterIds: string[][] = [];
  totalElements!: number;
  showPaginator = true;

  characters$!: Observable<Character[]>;

  ngOnInit(): void {
    this.updateCharacters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterIds']) {
      this.currentPage = 1;
      this.totalElements = this.characterIds
        .map((ids) => ids.length)
        .reduce((acc, val) => acc + val, 0);
      this.showPaginator = this.totalElements > 6;
    }
  }

  onPageChange(event: { pageIndex: number }) {
    this.currentPage = event.pageIndex + 1;
    this.updateCharacters();
  }

  updateCharacters() {
    if (this.characterIds.length === 0) {
      this.characters$ = this.charactersFacade.getRecords([]);
      return;
    }
    const extractedIds = this.characterIds[this.currentPage - 1].map((url) =>
      parseInt(url.split('/').slice(-1)[0]),
    );
    this.characters$ = this.charactersFacade.getRecords(extractedIds);
  }

  trackByFn(index: number, item: Character): unknown {
    return item.id || item.name || index;
  }
}
