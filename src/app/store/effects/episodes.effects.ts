import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EpisodeActions from '../actions/episodes.actions';
import { catchError, mergeMap, withLatestFrom, of, from, EMPTY, map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectEpisodes } from '../selectors/episodes.selectors';

@Injectable()
export class EpisodesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store);

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.loadEpisode),
      withLatestFrom(this.store.select(selectEpisodes)),
      mergeMap(([{ id }, episodes]) => {
        const episode = episodes[id];
        return episode
          ? EMPTY
          : from(this.apiService.getEpisode(id)).pipe(
              map((result) => {
                return EpisodeActions.loadEpisodeSuccess({
                  episode: result,
                });
              }),
              catchError((error) =>
                of(EpisodeActions.loadEpisodeFailure({ error: error.message })),
              ),
            );
      }),
    ),
  );
}
