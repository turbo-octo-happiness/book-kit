import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const thunk = require('redux-thunk').default;

const store = createStore(reducers.rootReducer,
  applyMiddleware(thunk)
);

module.exports = store;
