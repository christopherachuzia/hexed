import Booklistholder from '../ui/booklistholder'

import {connect} from 'react-redux'
import {
    returnLibraryBook,
} from '../../store/actioncreator'
import C from '../../store/actiontype'

const mapStateToProps = state =>{
    return {
        loading: state.loadinglibrary,
        user: state.user,
        bookdata: state.booklist
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
            
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Booklistholder)