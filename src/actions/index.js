import * as types from './action-type'

//添加计划
export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })

// 将书籍加入到书架

export const addBookHistory = content => ({type: types.ADD_BOOK_HISTORY, content})
export const deleteBookHistory = id => ({type: types.DELETE_BOOK_HISTORY, id})
export const updateBookHisroty = content => ({type: types.UPDATE_BOOK_HISTORY, content})