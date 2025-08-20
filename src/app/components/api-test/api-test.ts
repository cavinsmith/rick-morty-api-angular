import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { map, Observable } from 'rxjs';
import { Character } from '../../store/models/character.model';

@Component({
  selector: 'app-api-test',
  imports: [CommonModule],
  templateUrl: './api-test.html',
  styleUrl: './api-test.scss'
})
export class ApiTest implements OnInit {
  charactersFacade = inject(CharactersFacade);

  characters$!: Observable<Character[]>;
  currentCharacter: number = 1;

  updateCharacter() {
    this.characters$ = this.charactersFacade.getRecords([this.currentCharacter, this.currentCharacter + 1, this.currentCharacter + 2])
      .pipe(
        map((characters) => Object.values(characters).filter((c): c is Character => c !== undefined))
      );
  }

  ngOnInit() {
    this.updateCharacter();
  }

  nextCharacter() {
    this.currentCharacter+=2;
    this.updateCharacter();
  }

  previousCharacter() {
    if (this.currentCharacter > 1) {
      this.currentCharacter--;
      this.updateCharacter();
    }
  }

}
