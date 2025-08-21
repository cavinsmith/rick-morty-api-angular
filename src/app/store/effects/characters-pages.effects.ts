import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CharactersPagesActions from '../actions/characters-pages.actions';
import * as CharacterActions from '../actions/characters.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectCharactersPageIsLoaded } from '../selectors/characters-pages.selectors';
import { CharacterFilter } from 'rickmortyapi';
import { Character } from '../models/character.model';
import { Character as ApiCharacter } from 'rickmortyapi';

@Injectable()
export class CharactersPagesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

  private convertApiCharacter(apiCharacter: ApiCharacter): Character {
    return {
      ...apiCharacter,
    } as Character;
  }

  loadCharactersPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersPagesActions.loadCharactersPages),
      withLatestFrom(
        this.actions$.pipe(
          ofType(CharactersPagesActions.loadCharactersPages),
          switchMap((action) =>
            this.store.select(selectCharactersPageIsLoaded(action.page, action.filter)),
          ),
        ),
      ),
      mergeMap(([{ page, filter }, pageIsLoaded]) =>
        pageIsLoaded
          ? EMPTY
          : from(this.apiService.getCharacters(page, filter)).pipe(
              mergeMap((result) =>
                from([
                  CharactersPagesActions.loadCharactersPagesSuccess({
                    characters: result.characters.map((char) => this.convertApiCharacter(char)),
                    page: page,
                    totalPages: result.pages,
                    totalItems: result.items,
                    filter: filter as CharacterFilter,
                  }),
                  CharacterActions.loadCharactersSuccess({
                    characters: result.characters.map((char) => this.convertApiCharacter(char)),
                  }),
                ]),
              ),
              catchError((error) =>
                of(
                  CharactersPagesActions.loadCharactersPageFailure({
                    error: error.message,
                  }),
                ),
              ),
            ),
      ),
    ),
  );
}
