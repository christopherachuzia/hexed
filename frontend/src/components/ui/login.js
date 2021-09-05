import {React} from 'react'

const Login = ({cancelOverlay = f=>f})=>(
    <div className='overlay-content'>
        <div>
            Login
        </div>
        <div className='mt-1'>
            <input placeholder='Email'/>
        </div>
        <div className='mt-1'>
            <input placeholder='Password' type='password'/>
        </div>
        <div className='overlay-btn-holder'>
            <button className='login-btn'>Login</button>
            <button className='delete-btn-fill' key='çancellogin' onClick={()=>{
                cancelOverlay();
            }}>Cancel</button>
        </div>
    </div>
)

export default Login