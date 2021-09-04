import Bookholder from '../ui/bookholder'

import {connect} from 'react-redux'
import {
    borrowLibraryBook,
} from '../../store/actioncreator'
import C from '../../store/actiontype'

const mapStateToProps = state =>{
    return {
        loading: state.loadinglibrary,
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
            
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bookholder)