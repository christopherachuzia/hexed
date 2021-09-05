import {React, useState} from 'react'



const Login = ({cancelOverlay = f=>f, loginUser = f=>f})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onInput = (e) =>{
        e.preventDefault()
        const type = e.target.name
        const value = e.target.value
        if(type === 'email'){
            setEmail(value)
        }
        else{
            setPassword(value)
        }
    }
    
    return (
        <form className='overlay-content' onSubmit={(e)=>{
            e.preventDefault()
            loginUser({email,password})
        }}>
            <div>
                Login
            </div>
            <div className='mt-1'>
                <input placeholder='Email' value={email} type='email' required name='email'
                onInput={onInput}/>
            </div>
            <div className='mt-1'>
                <input placeholder='Password' value={password}  type='password' name='password' required
                onInput={onInput}/>
            </div>
            <div className='overlay-btn-holder'>
                <button className='login-btn'
                >Login</button>
                <button className='delete-btn-fill' key='çancellogin' onClick={()=>{
                    cancelOverlay();
                }}>Cancel</button>
            </div>
        </form>
    )
}

export default Login