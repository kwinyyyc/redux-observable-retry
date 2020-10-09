import { createStore, applyMiddleware } from 'redux';
import { fetchUserEpic as rootEpic } from './rootEpic';
import { createEpicMiddleware } from 'redux-observable';
import { reducer} from './reducer';
const epicMiddleware = createEpicMiddleware();

export const store = createStore(
    reducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);
