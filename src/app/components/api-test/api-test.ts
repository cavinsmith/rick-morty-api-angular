import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { map, Observable } from 'rxjs';
import { Character } from '../../store/models/character.model';
import { Location } from '../../store/models/location.model';
import { CharacterCard } from '../character-card/character-card';
import { LocationsFacade } from '../../store/facades/locations.facade';
import { ListLocations } from '../list-locations/list-locations.component';

@Component({
  selector: 'app-api-test',
  imports: [CommonModule, CharacterCard, ListLocations],
  templateUrl: './api-test.html',
  styleUrl: './api-test.scss'
})
export class ApiTest implements OnInit {
  charactersFacade = inject(CharactersFacade);
  locationsFacade = inject(LocationsFacade);

  characters$!: Observable<Character[] | undefined>;
  location$!: Observable<Location | undefined>;
  currentCharacter: number = 1;
  currentLocation: number = 1;

  updateCharacter() {
    this.characters$ = this.charactersFacade.getRecords([this.currentCharacter, this.currentCharacter + 1, this.currentCharacter + 2])
      .pipe(
        map((characters) => Object.values(characters).filter((c): c is Character => c !== undefined))
      );
  }

  updateLocation() {
    this.location$ = this.locationsFacade.getRecord(this.currentLocation)
  }

  ngOnInit() {
    this.updateCharacter();
    this.updateLocation();
  }

  nextCharacter() {
    this.currentCharacter+=2;
    this.currentLocation++;
    this.updateCharacter();
    this.updateLocation();

  }

  previousCharacter() {
    if (this.currentCharacter > 1) {
      this.currentCharacter--;
      this.updateCharacter();
    }
    if (this.currentLocation > 1) {
      this.currentLocation--;
      this.updateLocation();
    }
  }

}
