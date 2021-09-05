import {React, useState} from 'react'



const Createaccount = ({cancelOverlay = f=>f, createUser = f=>f})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name,setName] = useState('')

    const onInput = (e) =>{
        e.preventDefault()
        const type = e.target.name
        const value = e.target.value
        if(type === 'email'){
            setEmail(value)
        }
        else if(type === 'name'){
            setName(value)
        }
        else{
            setPassword(value)
        }
    }

    return (
    <form className='overlay-content' onSubmit={(e)=>{
        e.preventDefault()
        createUser({email,name,password})
    }}>
        <div>
            Create Account
        </div>
        <div className='mt-1'>
            <input placeholder='Email' value={email} type='email' name='email' required
            onInput={onInput}/>
        </div>
        <div className='mt-1'>
            <input placeholder='Fullname' value={name} name='name' required
            onInput={onInput}/>
        </div>
        <div className='mt-1'>
            <input placeholder='Password' value={password} type='password' name='password' required
            onInput={onInput}/>
        </div>
        <div className='overlay-btn-holder'>
            <button className='createaccount-btn'>Create</button>

            <button className='delete-btn-fill' key='cancelcreate' 
            onClick={()=>{
                cancelOverlay();
            }}>Cancel</button>
        </div>
    </form>
)
}

export default Createaccount