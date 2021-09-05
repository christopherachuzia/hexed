import {React} from 'react'

const Addbook = ({cancelOverlay= f=>f})=>(
    <div className='overlay-content'>
        <div>
            Add Book
        </div>
        <div className='mt-1'>
            <input placeholder='Title'/>
        </div>
        <div className='mt-1'>
            <input placeholder='Amount' type='number'/>
        </div>
        <div className='overlay-btn-holder'>
            <button className='login-btn'>Add Book</button>
            <button className='delete-btn-fill' key='canceladd' onClick={()=>{
                cancelOverlay();
            }}>Cancel</button>
        </div>
    </div>
)

export default Addbook