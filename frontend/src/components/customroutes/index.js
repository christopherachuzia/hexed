import {React} from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

const Customroute = ({component, user, path})=>(
    <>
        {
            path === '/report' && user.isadmin ?
            <Route path={path} component={component}></Route>
            : path === '/booklist' && user.name ?
            <Route path={path} component={component}></Route> 
            :
            <Redirect from={path} to='/'></Redirect>
        }
    </>
)

const mapStateToProps = state =>{
    return{
        user: state.user
    }
}

export default connect(
    mapStateToProps, null
)(Customroute)
