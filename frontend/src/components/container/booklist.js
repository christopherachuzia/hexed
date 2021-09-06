import Booklistholder from '../ui/booklistholder'

import {connect} from 'react-redux'
import {
    returnLibraryBook,
    addToLibraryBook,
    setScreen,
    getUserBooklist
} from '../../store/actioncreator'
import C from '../../store/actiontype'

const mapStateToProps = state =>{
    return {
        screen: state.popupscreen,
        loading: state.loading,
        user: state.user,
        bookdata: state.booklist,
        loadbooklist: state.loadingbooklist,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        borrowBook: async (userid, bookid)=>{
            try{
                const {data: returnedbook} = await dispatch(returnLibraryBook(userid,bookid))
                dispatch({
                    type: C.RETURN_BOOK,
                    value: returnedbook.book
                })
                alert(`${returnedbook.book.book_title} returned to library`)
            }catch(err){
                alert(err.message)
            }
            
        },

        returnBook: async (userid,bookid)=>{
            try{
                const {data: result} = await dispatch(returnLibraryBook(userid,bookid))
                
                if('auth' in result){
                    throw new Error('Login or Create Account to view booklist')
                }

                if('error' in result){
                    throw new Error(result.message)
                }

                console.log(result)
                dispatch({
                    type: C.RETURN_BOOK,
                    value: result.book
                })
                alert('Book returned to library')
            }
            catch(err){
                alert(err.message)
            }
        },

        onloadBooklist: async ()=>{
            try{
                const {data: result} = await dispatch(getUserBooklist())
                
                if('auth' in result){
                    throw new Error('Login or Create Account to view booklist')
                }

                if('error' in result){
                    throw new Error(result.message)
                }

                dispatch({
                    type: C.LOAD_BOOKLIST,
                    value: result.reports
                })

                dispatch({
                    type: C.START_LOADING,
                    value: false
                })
            }
            catch(err){
                dispatch({
                    type: C.LOAD_BOOKLIST,
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

        addNewBook: async (title,amount)=>{
            try{
                const {data: result} = await dispatch(addToLibraryBook(title,amount))

                if('auth' in result){
                    return new Error('Log in or Create Account to add book')
                }
                if('error' in result ){
                    throw new Error(result.message)
                }
                dispatch(setScreen(-1))
                alert('New book '+result.book.book_title+' added')
            }
            catch(err){
                alert(err.message)
            }
        },
        
        cancelOverlay: ()=>{
            dispatch({
                type:C.SET_SCREEN,
                value: -1
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Booklistholder)