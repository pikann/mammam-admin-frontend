import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import {rootSaga} from '../sagas';
import apiMiddleWare from './middlewares/api';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  // applyMiddleware(sagaMiddleware, createLogger(), apiMiddleWare),
  applyMiddleware(sagaMiddleware, apiMiddleWare),
);

sagaMiddleware.run(rootSaga);

export {store};
