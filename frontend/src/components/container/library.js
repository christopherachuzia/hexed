import Bookholder from '../ui/bookholder'

import {connect} from 'react-redux'
import {
    borrowLibraryBook,
    loadLibraryContent 
} from '../../store/actioncreator'
import C from '../../store/actiontype'

const mapStateToProps = state =>{
    return {
        screen: state.popupscreen,
        loading: state.loading,
        user: state.user,
        bookdata: state.librarybook
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        borrowBook: async (userid, bookid)=>{
            try{
                const {data: bookborrowed} = await dispatch(borrowLibraryBook(userid,bookid))
                dispatch({
                    type: C.BORROW_BOOK,
                    value: bookborrowed.book
                })
                alert(`${bookborrowed.book.book_title} borrowed from library`)
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

        onloadBook: async ()=>{
            try{
                const {data: result} = await dispatch(loadLibraryContent())
                dispatch({
                    type: C.LOAD_LIBRARY,
                    value: result.content
                })

                dispatch({
                    type: C.START_LOADING,
                    value: false
                })
            }catch(err){
                
                dispatch({
                    type: C.START_LOADING,
                    value: false
                })

                dispatch({
                    type: C.LOAD_LIBRARY,
                    value: [
                        {
                            _id:'book1id',
                            book_id: 'book1id',
                            book_title: 'Introduction to javascript',
                            amount: 2
                        },
                        {
                            _id:'book2id',
                            book_id: 'book2id',
                            book_title: 'Machine Learning with Python',
                            amount: 4
                        },
                        {
                            _id:'book3id',
                            book_id: 'book3id',
                            book_title: 'PHP 7 & MySQL 5 for Beginners',
                            amount: 1
                        },
                        {
                            _id:'book4id',
                            book_id: 'book4id',
                            book_title: 'Node.js Beginner to Profession (2nd Edition)',
                            amount: 3
                        },
                        {
                            _id:'book5id',
                            book_id: 'book5id',
                            book_title: 'Microservice using Spring 2.0',
                            amount: 2
                        }
                    ]
                })
                alert(err.message)
            }
        },
    }
}

const Library = connect(
    mapStateToProps,
    mapDispatchToProps
)(Bookholder)

export default Library