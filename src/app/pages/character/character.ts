
import { Component, inject, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Observable } from 'rxjs';

import { CharacterCard } from '../../components/character-card/character-card';
import { Loader } from "../../components/loader/loader";

@Component({
  selector: 'app-page-character',
  imports: [CommonModule, CharacterCard, Loader],
  templateUrl: './character.html',
  styleUrl: './character.scss',
})
export class Character implements OnChanges, OnInit {
  charactersFacade = inject(CharactersFacade);
  route = inject(ActivatedRoute);

  @Input() currentCharacter: number = 55;
  @Input() id!: string;

  character$!: Observable<any>;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.currentCharacter = +params['id'];
        this.updateCharacter();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCharacter']) {
      this.updateCharacter();
    }
  }

  updateCharacter() {
    this.character$ = this.charactersFacade.getRecord(this.currentCharacter);
  }
}