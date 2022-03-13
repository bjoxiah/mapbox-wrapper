import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store} from '@ngrx/store';
import { RootState } from "../state";
import {loadData, loadDataFailure, loadDataSuccess, loadRecordDetail, loadRecordDetailSuccess} from "../actions";
import {MapService} from "../../services/map/map.service";
import {selectRouter} from "../selectors";

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private mapService: MapService
  ) {}

  // Run this code when a loadData action is dispatched
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadData),
      switchMap(() =>
        // Call the fetchData method, convert it to an observable
        from(this.mapService.fetchData()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((root) => loadDataSuccess({ data: root })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadDataFailure({ error })))
        )
      )
    )
  );

  // Run this code when a loadRecordDetail action is dispatched
  loadRecordDetail$ = createEffect(() =>
      this.actions$.pipe(
      ofType(loadRecordDetail),
      withLatestFrom(
        this.store.select<any>(selectRouter),
        (action, router) => {
          return {
            id: router.state.params.id,
            payload: action
          }
        }
      ),
      switchMap(({ id }) =>
        from(this.mapService.fetchRecordDetail(id))
        .pipe(
          map((root) => loadRecordDetailSuccess({data: root})),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadDataFailure({error})))
        ))
      )
  );

}
