import {React} from 'react';

const Visitor = ({showCreateAccount =f=>f,showLogin = f=>f})=>(
    <div className='visitor-nav'>
        <div className='visition-holder'>
            <button className='createaccount-btn mr-1' onClick={()=>{showCreateAccount()}}>Create Account</button>
            <button className='login-btn' onClick={()=>{showLogin()}}>Login</button>
        </div>
    </div>
)

export default Visitor
