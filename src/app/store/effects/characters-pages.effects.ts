import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CharactersPagesActions from '../actions/characters-pages.actions';
import * as CharacterActions from '../actions/characters.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectCharactersPageIsLoaded } from '../selectors/characters-pages.selectors';
import { CharacterFilter } from 'rickmortyapi';

@Injectable()
export class CharactersPagesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

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
                    characters: result.characters,
                    page: page,
                    totalPages: result.pages,
                    totalItems: result.items,
                    filter: filter as CharacterFilter,
                  }),
                  CharacterActions.loadCharactersSuccess({
                    characters: result.characters,
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
