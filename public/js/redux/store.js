import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';


const logger = createLogger();

const store = createStore(reducers.rootReducer,
  applyMiddleware(thunk, logger)
);

module.exports = store;
