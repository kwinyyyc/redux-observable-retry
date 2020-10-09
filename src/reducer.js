import { FETCH_USER, FETCH_USER_FULFILLED, FETCH_USER_REJECTED } from './rootEpic';

export function reducer(state = { githubUser: null, status: null }, action) {
    if (action.type === FETCH_USER) {
        const newState = { ...state, githubUser: null, status: 'loading'}
      return newState;
    } else if (action.type === FETCH_USER_FULFILLED) {
        const newState = { ...state, githubUser: action.payload, status: 'success'}
      return newState;
    } else if (action.type === FETCH_USER_REJECTED) {
        const newState = { ...state, githubUser: null, status: 'failed'}
      return newState;
   } else {
      return state 
    }
  }