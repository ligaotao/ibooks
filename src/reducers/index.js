import { combineReducers } from 'redux'
// import home from './home.js';//首页
/**
 * 合并多个reducer
 * @type {[type]}
 */

function test (state = [], action) {
    return {
        hello: 'world'
    }
}

const reducer = combineReducers({
    test
});


export default reducer;