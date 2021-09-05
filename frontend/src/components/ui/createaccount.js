import {React} from 'react'

const Createaccount = ({cancelOverlay = f=>f})=>(
    <div className='overlay-content'>
        <div>
            Create Account
        </div>
        <div className='mt-1'>
            <input placeholder='Email'/>
        </div>
        <div className='mt-1'>
            <input placeholder='Fullname'/>
        </div>
        <div className='mt-1'>
            <input placeholder='Password' type='password'/>
        </div>
        <div className='overlay-btn-holder'>
            <button className='createaccount-btn'>Create</button>
            <button className='delete-btn-fill' key='çancelcreate' onClick={()=>{
                cancelOverlay();
            }}>Cancel</button>
        </div>
    </div>
)

export default Createaccount