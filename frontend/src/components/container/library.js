import Bookholder from '../ui/bookholder'

import {connect} from 'react-redux'
import {
    borrowLibraryBook,
    loadLibraryContent,
    createNewUser,
    setScreen,
    loginUser
} from '../../store/actioncreator'
import C from '../../store/actiontype'

const mapStateToProps = state =>{
    return {
        screen: state.popupscreen,
        loading: state.loading,
        user: state.user,
        bookdata: state.librarybook,
        loadlibrary: state.loadinglibrary,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        borrowBook: async (userid, bookid)=>{
            try{
                const {data: result} = await dispatch(borrowLibraryBook(userid,bookid))
                
                if('auth' in result){
                    throw new Error('Login or Create Account to borrow book')
                }
                else if('error' in result){
                    throw new Error(result.message)
                }

                dispatch({
                    type: C.BORROW_BOOK,
                    value: result.book
                })
                alert(`${result.book.book_title} borrowed from library`)
            }catch(err){
                alert(err.message)
            }
            
        },
        
        cancelOverlay: ()=>{
            dispatch({
                type:C.SET_SCREEN,
                value: -1
            })
        },

        createUser: async fields =>{
            try{
                const {data: result} = await dispatch(createNewUser(fields))
                if('error' in result){
                    throw new Error(result.message)
                }

                dispatch({
                    type: C.UPDATE_USER,
                    value:{
                        email: result.email,
                        name: result.name,
                        isadmin: result.isadmin ? result.isadmin : false
                    }
                })
                localStorage.setItem('user-token',result.token)
                dispatch(setScreen(-1))
            }
            catch(err){
                alert(err.message)
            }
        },

        loginUser: async fields =>{
            try{
                const {data: result} = await dispatch(loginUser(fields))

                if('error' in result){
                    throw new Error(result.message)
                }

                dispatch({
                    type: C.UPDATE_USER,
                    value:{
                        email: result.email,
                        name: result.name,
                        isadmin: result.isadmin ? result.isadmin : false
                    }
                })
                localStorage.setItem('user-token',result.token)
                dispatch(setScreen(-1))
            }
            catch(err){
                alert(err.message)
            }
        },

        onloadBook: async ()=>{
            try{
                const {data: result} = await dispatch(loadLibraryContent())
                
                if('error' in result){
                    throw new Error(result.message)
                }

                dispatch({
                    type: C.LOAD_LIBRARY,
                    value: result.content
                })

                dispatch({
                    type: C.START_LOADING,
                    value: false
                })
            }catch(err){
                console.log('err here')
                dispatch({
                    type: C.LOAD_LIBRARY,
                    value: [{
                        error: err.message
                    }]
                })
                dispatch({
                    type: C.START_LOADING,
                    value: false
                })
                alert(err.message)
            }
        },

        updateBook: (book, action)=>{
            if(action === 'update'){
                dispatch({
                    type: C.UPDATE_BOOK,
                    value: book
                })
            }
            else{

                dispatch({
                    type: C.DELETE_BOOK,
                    value: {_id:book}
                })
            }
        }
    }
}

const Library = connect(
    mapStateToProps,
    mapDispatchToProps
)(Bookholder)

export default Library