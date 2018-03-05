import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from 'src/reducers';
// import * as production from './production/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...home}),
  applyMiddleware(thunk)
);

export default store;