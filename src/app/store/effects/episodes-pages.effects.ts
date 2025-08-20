import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EpisodesPagesActions from '../actions/episodes-pages.actions';
import * as EpisodeActions from '../actions/episodes.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectEpisodesPageIsLoaded } from '../selectors/episodes-pages.selectors';
import { EpisodeFilter } from 'rickmortyapi';

@Injectable()
export class EpisodesPagesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

loadEpisodesPage$ = createEffect(() => this.actions$.pipe(
    ofType(EpisodesPagesActions.loadEpisodesPages),
    withLatestFrom(
      this.actions$.pipe(
        ofType(EpisodesPagesActions.loadEpisodesPages),
        switchMap(action => this.store.select(selectEpisodesPageIsLoaded(action.page, action.filter)))
      )
    ),
    mergeMap(([{ page, filter }, pageIsLoaded]) => pageIsLoaded ? EMPTY : 
        from(this.apiService.getEpisodes(page, filter)).pipe(
          mergeMap((result) => from([
            EpisodesPagesActions.loadEpisodesPagesSuccess({
              episodes: result.episodes,
              page: page,
              totalPages: result.pages,
              totalItems: result.items,
              filter: filter as EpisodeFilter
            }),
            EpisodeActions.loadEpisodesSuccess({ 
              episodes: result.episodes 
            })
          ])),
          catchError((error) => of(EpisodesPagesActions.loadEpisodesPageFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );

}