import {React} from 'react';
import '../../index.css'

const visitor = (showCreateAccount,showLogin)=>(
    <div className='flex-nav'>
        <div>
            <button className='createaccount-btn' onclick={showCreateAccount}>Create Account</button>
            <button className='login-btn' onclick={showLogin}>Login</button>
        </div>
    </div>
)

export default visitor
