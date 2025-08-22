import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharactersFacade } from '../../store/facades/characters.facade';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Character as CharacterModel } from '../../store/models/character.model';

import { CharacterCard } from '../../components/character-card/character-card';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-page-character',
  imports: [CommonModule, CharacterCard, Loader],
  templateUrl: './character.html',
  styleUrl: './character.scss',
})
export class Character implements OnChanges, OnInit, OnDestroy {
  charactersFacade = inject(CharactersFacade);
  route = inject(ActivatedRoute);

  @Input() currentCharacter = 55;
  @Input() id!: string;

  character$!: Observable<CharacterModel | undefined>;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['id']) {
        this.currentCharacter = +params['id'];
        this.updateCharacter();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
