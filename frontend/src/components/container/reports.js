import Reportbookholder from '../ui/reportbookholder'
import C from '../../store/actiontype'
import {addToLibraryBook, setScreen} from '../../store/actioncreator'
import {connect} from 'react-redux'
import {getBorrowReport} from '../../store/actioncreator'
const mapStateToProps = state =>{
    return {
        screen: state.popupscreen,
        loading: state.loading,
        bookdata: state.borrowedreport,
        loadreport: state.loadingreport,
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        cancelOverlay: ()=>{
            dispatch({
                type:C.SET_SCREEN,
                value: -1
            })
        },

        onloadReport: async()=>{
            try{
                const {data: result} = await dispatch(getBorrowReport())
                
                if('auth' in result){
                    throw new Error('Login or Create Account to view reports')
                }

                if('error' in result){
                    throw new Error(result.message)
                }

                dispatch({
                    type: C.LOAD_REPORT,
                    value: result.reports
                })

                dispatch({
                    type: C.START_LOADING,
                    value: false
                })
            }
            catch(err){
                dispatch({
                    type: C.LOAD_REPORT,
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reportbookholder)