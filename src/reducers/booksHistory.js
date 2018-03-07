import { ADD_BOOK_HISTORY, DELETE_BOOK_HISTORY, UPDATE_BOOK_HISTORY } from 'src/actions/action-type'

let initialState = []

try {
    let store = JSON.parse(window.localStorage.store)
    initialState = store.reducers.booksHistory
} catch (e) {
    console.log('初始化错误')
}

export default function books (state = initialState, action) {

    switch (action.type) {
        case ADD_BOOK_HISTORY:
            return [
                ...state,
                action.content
            ]
        case UPDATE_BOOK_HISTORY:
            return state.map(k => {
                if (k._id === action.content._id) {
                    return action.content
                } else {
                    return k
                }
            })
        case DELETE_BOOK_HISTORY:
            let arr = state.filter((k, i) => {
                return k._id !== action.id
            })
            return arr
        default:
            return state
    }
}
