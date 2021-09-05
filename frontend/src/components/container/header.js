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
        showCreateAccount: value =>{
            dispatch(setScreen(1))
            // dispatch(showCreateAccount(value))
        },
        showLogin: value =>{
            dispatch(setScreen(0))
            // dispatch(showLogin(value))
        },
        showAddBook: value =>{
            dispatch(setScreen(2))
            // dispatch(showAddBook(value))
        },
        logOutUser: ()=>{
            dispatch(logOutUser())
            localStorage.removeItem('user-token')
        },
        searchBook: async value =>{
            try{
                let response;
                if(value.trim() === ''){
                    console.log('here')
                    response = await dispatch(loadLibraryContent())
                }
                else{
                    console.log('not here')
                    response = await dispatch(searchBook(value))
                }

                const {data: result} = response

                dispatch({
                    type: C.LOAD_LIBRARY,
                    value: result
                })

                dispatch({
                    type: C.START_LOADING,
                    value: false
                })
            }
            catch(err){
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