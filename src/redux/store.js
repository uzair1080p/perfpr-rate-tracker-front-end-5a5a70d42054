import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import accounts from './models/accounts';
import processors from './models/processors';
import users from './models/users';

// setup middleware
let enhancer = compose(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers({
  users,
  accounts,
  processors,
});

export default createStore(rootReducer, enhancer);
