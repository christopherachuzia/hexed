import C  from './actiontype';

export const startlogin =  (state = false, action)=>{
    switch(action.type){
        case C.SHOW_LOGIN:
            return action.value
        default: return state
    }
}

export const showcreateaccount = (state = false, action)=>{
    switch(action.type){
        case C.SHOW_CREATE_ACCOUNT:
            return action.value
        default: return state
    }
}

export const startcreateaccount = (state = false, action)=>{
    switch(action.type){
        case C.CREATE_ACCOUNT:
            return action.value
        default: return state
    }
}

export const book = (state = {}, action) =>{
    switch(action.type){
        case C.ADD_BOOK:
            return {...action.value}
        case C.UPDATE_BOOK:
            return state._id === action.value._id ? {...action.value,_id: state._id} : state
        default: return state
    }
}


export const librarybook = (state = [], action) =>{
    switch(action.type){
        case C.ADD_BOOK:
            return [...state, book({},action)]
        case C.DELETE_BOOK:
            const newstate = [...state.filter(bookdata => bookdata._id !== action.value._id)]
            return [...newstate]
        case C.UPDATE_BOOK:
            return state.map(bookdata => book(bookdata,action))
        case C.LOAD_LIBRARY:
            return [...action.value]
        default: return state
    }
}


export const myborrowedbook = (state = {}, action) =>{
    switch(action.type){
        case C.BORROW_BOOK:
            return {...action.value}
        default: return state
    }
}

export const booklist = (state = [], action) =>{
    switch(action.type){
        case C.BORROW_BOOK:
            return [...state, myborrowedbook({},action)]
        case C.RETURN_BOOK:
            const newstate = [...state.filter(bookdata => bookdata._id !== action.value._id)]
            return [...newstate]
        case C.LOAD_BOOKLIST:
            return [...action.value]
        default: return state
    }
}

export const searchbook = (state = '', action) =>{
    switch(action.type){
        case C.SEARCH_BOOK:
            return action.value
        case C.CLEAR_SEARCH:
            return ''
        default: return state
    }
}

export const borrowedreport = (state = [], action) =>{
    switch(action.type){
        case C.LOAD_REPORT:
            return [...action.value]
        default: return state
    }
}

export const user = (state = {}, action)=>{
    switch(action.type){
        case C.UPDATE_USER:
            return {...action.value}
        default: return state
    }
}

export const addbook = (state = false, action) =>{
    switch(action.type){
        case C.SHOW_ADD:
            return action.value
        default: return state
    }
}

export const startdelete = (state = false, action) =>{
    switch(action.type){
        case C.START_DELETE:
            return action.value
        default: return state
    }
}

export const returnbook = (state = false, action)=>{
    switch(action.type){
        case C.START_RETURN:
            return action.value
        default: return state
    }
}

export const borrowbook = (state = false, action) =>{
    switch(action.type){
        case C.START_BORROW_BOOK:
            return action.value
        default: return state
    }
}

export const loading = (state = false, action) =>{
    switch(action.type){
        case C.START_LOADING:
            return action.value
        default: return state
    }
}


export const popupscreen = (state = -1, action) =>{
    switch(action.type){
        case C.SET_SCREEN:
            return action.value
        default: return state
    }
}
