import Navcontent from '../ui/navcontent'
import {connect} from 'react-redux'
import {
    // showCreateAccount,
    // showLogin,
    // showAddBook,
    logOutUser,
    searchBook,
    loadLibraryContent,
    setScreen
} from '../../store/actioncreator'
import C from '../../store/actiontype'



const mapStateToProps = state =>{
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        showCreateAccount: () =>{
            dispatch(setScreen(1))
            // dispatch(showCreateAccount(value))
        },
        showLogin: () =>{
            dispatch(setScreen(0))
            // dispatch(showLogin(value))
        },
        showAddBook: () =>{
            dispatch(setScreen(2))
            // dispatch(showAddBook(value))
        },
        showHome: () =>{
            dispatch({
                type: C.START_LOADING,
                value: true,
            })
            dispatch({
                type: C.STAT_LIBRARY_LOAD,
                value: true
            })
        },

        showReports: ()=>{
            dispatch({
                type: C.START_LOADING,
                value: true,
            })
            dispatch({
                type: C.START_REPORT_LOAD,
                value: true
            })
        },

        showBooklist: ()=>{
            dispatch({
                type: C.START_LOADING,
                value: true,
            })
            dispatch({
                type: C.START_BOOKLIST_LOAD,
                value:true
            })
        },

        logOutUser: ()=>{
            dispatch(logOutUser())
            localStorage.removeItem('user-token')
            localStorage.removeItem('redux-store')
        },
        searchBook: async value =>{
            try{
                dispatch({
                    type: C.STAT_LIBRARY_LOAD,
                    value: true
                })
                dispatch({
                    type: C.START_LOADING,
                    value: true
                })
                let response;
                if(value.trim() === ''){
                    response = await dispatch(loadLibraryContent())
                }
                else{
                    response = await dispatch(searchBook(value))
                }

                const {data: result} = response
                
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
            }
            catch(err){
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navcontent)