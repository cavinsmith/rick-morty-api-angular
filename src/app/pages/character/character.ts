
import { Component, inject, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Observable } from 'rxjs';

import { Title } from "../../components/title/title";
import { Text } from "../../components/text/text";

@Component({
  selector: 'app-page-character',
  imports: [CommonModule, Title, Text],
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