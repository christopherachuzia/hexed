import {combineReducers, applyMiddleware, createStore} from 'redux'

import {
    startlogin,
    showcreateaccount,
    startcreateaccount,
    librarybook,
    booklist,
    searchbook,
    borrowedreport,
    user,
    addbook,
    startdelete,
    returnbook,
    borrowbook
} from './reducer'

import state from './initialstate'

import thunk from 'redux-thunk'

const storeFactory = (initialstate = state) =>(
    applyMiddleware(thunk)(createStore)(
        combineReducers({
            startlogin,
            showcreateaccount,
            startcreateaccount,
            librarybook,
            booklist,
            searchbook,
            borrowedreport,
            user,
            addbook,
            startdelete,
            returnbook,
            borrowbook
        }),
        localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : initialstate
    )
)

export default storeFactory