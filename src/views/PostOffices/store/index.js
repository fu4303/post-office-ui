import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { createLogger } from 'redux-logger';

import middleWares from '../middlewares';
import reducers from '../reducers';

const storeMiddlewares = [
  middleWares
];

if (process.env.NODE_ENV === 'development') {
  storeMiddlewares.push(createLogger());
}

export default function configureStore(initialState) {
  return compose(applyMiddleware(...storeMiddlewares))(createStore)(combineReducers(reducers), initialState);
}
