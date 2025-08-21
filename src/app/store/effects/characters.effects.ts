import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CharacterActions from '../actions/characters.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectCharacters } from '../selectors/characters.selectors';
import { Character } from '../models/character.model';
import { Character as ApiCharacter } from 'rickmortyapi';

@Injectable()
export class CharactersEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

  private convertApiCharacter(apiCharacter: ApiCharacter): Character {
    return {
      ...apiCharacter,
    } as Character;
  }

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacter),
      withLatestFrom(this.store.select(selectCharacters)),
      mergeMap(([{ id }, characters]) => {
        const character = characters[id];
        return character
          ? EMPTY
          : from(this.apiService.getCharacter(id)).pipe(
              map((result) => {
                return CharacterActions.loadCharacterSuccess({
                  character: this.convertApiCharacter(result),
                });
              }),
              catchError((error) =>
                of(CharacterActions.loadCharacterFailure({ error: error.message })),
              ),
            );
      }),
    ),
  );

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      withLatestFrom(this.store.select(selectCharacters)),
      mergeMap(([{ ids }, characters]) => {
        const missingIds = ids.filter((id) => !characters[id]);
        return missingIds.length
          ? from(this.apiService.getMultipleCharacters(missingIds)).pipe(
              map((result) => {
                const characters = Array.isArray(result) ? result : [result];
                return CharacterActions.loadCharactersSuccess({
                  characters: characters.map((char) => this.convertApiCharacter(char)),
                });
              }),
              catchError((error) =>
                of(CharacterActions.loadCharactersFailure({ error: error.message })),
              ),
            )
          : EMPTY;
      }),
    ),
  );
}
