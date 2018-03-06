import { combineReducers } from 'redux';

import booksHistory from './booksHistory';


var reducers = combineReducers({
    booksHistory: booksHistory
})

export default reducers;