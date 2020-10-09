import { ajax } from 'rxjs/ajax';
import { of, throwError, Observable } from 'rxjs';
import { mergeMap, map, retryWhen, delay, tap, take, catchError, concat, concatMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';

// action creators
export const fetchUser = username => ({ type: FETCH_USER, payload: username });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });

// epic
export const fetchUserEpic = action$ => action$.pipe(
  ofType(FETCH_USER),
  mergeMap(action =>
    ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
      map(response => fetchUserFulfilled(response)),
      retryWhen((errors) => {
        let retries = 0;
        return errors.pipe(
          delay(1000),
          tap((error) => console.log(`Retrying after error: ${error}`)),
          take(2),
          concat(throwError(errors))
        )
      }),
      catchError((error) => {
        return of({ type: FETCH_USER_REJECTED, payload: error})
      })
    ),
  ),
);
