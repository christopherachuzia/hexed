import Navcontent from '../ui/navcontent'
import {connect} from 'react-redux'
import {
    showCreateAccount,
    showLogin,
    showAddBook,
    logOutUser,
    searchBook,
    loadLibraryContent
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
            dispatch(showCreateAccount(value))
        },
        showLogin: value =>{
            dispatch(showLogin(value))
        },
        showAddBook: value =>{
            dispatch(showAddBook(value))
        },
        logOutUser: ()=>{
            dispatch(logOutUser())
            localStorage.removeItem('user-token')
        },
        searchBook: async value =>{
            try{
                let response;
                if(value.trim() === ''){
                    response = await dispatch(loadLibraryContent())
                }
                else{
                    response = await dispatch(searchBook(value))
                }

                const {data: result} = response

                dispatch({
                    type: C.LOAD_LIBRARY,
                    value: result
                })
            }
            catch(err){
                alert(err.message)
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navcontent)