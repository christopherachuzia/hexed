import Booklistholder from '../ui/booklistholder'

import {connect} from 'react-redux'
import {
    returnLibraryBook,
} from '../../store/actioncreator'
import C from '../../store/actiontype'

const mapStateToProps = state =>{
    return {
        screen: state.popupscreen,
        loading: state.loadinglibrary,
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