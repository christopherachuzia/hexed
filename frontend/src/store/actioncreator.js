import C from './actiontype';

import DBService from '../utils/DBService'


export const loadLibraryContent = () =>{
    return (dispatch) =>{
        dispatch({
            type: C.STAT_LIBRARY_LOAD,
            value: false
        })
       return DBService.getContent()
    }
}

export const searchBook = value =>{
    return (dispatch) =>{
        dispatch({
            type: C.STAT_LIBRARY_LOAD,
            value: false
        })
        return DBService.getContent(value)
    }
}

export const loginUser = ({email,password})=>{
    return ()=>{
        return DBService.logIn({email, password})
    }
}

export const createNewUser = ({email, name, password})=>{
    return ()=>{
        return DBService.createAccount({email, name, password})
    }
}

export const getUserBooklist = ()=>{
    return (dispatch)=>{
        dispatch({
            type: C.START_BOOKLIST_LOAD,
            value: false
        })
        return DBService.getBooklist()
    }
}


export const getBorrowReport = ()=>{
    return (dispatch)=>{
        dispatch({
            type: C.START_REPORT_LOAD,
            value: false
        })
        return DBService.getReport()
    }
}


export const borrowLibraryBook = (userid, bookid)=>{
    return (dispatch)=>{
        dispatch({
            type: C.START_BORROW_BOOK,
            value: true
        })
        return DBService.borrowFromLibrary({userid, bookid})
    }
}


export const returnLibraryBook = (userid, bookid)=>{
    return ()=>{
        return DBService.returnBorrowedBook({userid, bookid})
    }
}


export const addToLibraryBook = (title, amount)=>{
    return ()=>{
        return DBService.addLibraryBook({title, amount})
    }
}


export const deleteFromLibrary = id =>{
    return ()=>{
        
        return DBService.deleteLibraryBook(id)
    }
}

export const showAddBook = value =>{
    return {
        type: C.SHOW_ADD,
        value
    }
}

export const showCreateAccount = value =>{
    return {
        type: C.SHOW_CREATE_ACCOUNT,
        value
    }
}

export const showLogin = value=>{
    return {
        type: C.SHOW_LOGIN,
        value
    }
}

export const logOutUser = ()=>{
    return{
        type: C.UPDATE_USER,
        value: {}
    }
}

export const setScreen = (value)=>{
    return{
        type: C.SET_SCREEN,
        value
    }
}

