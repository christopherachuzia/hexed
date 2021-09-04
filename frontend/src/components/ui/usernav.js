import {React} from 'react';
import '../../index.css'
import {NavLink} from 'react-router-dom'

const usernav = ({name,isadmin},showAddBook,logOutUser)=>{
    <div className='flex-nav'>
        <div>
            <span className='text-capitalize'>{name}</span>
            <div className='mt-1'>
                <NavLink className='plain-btn-underlined' to='/books'>View Library</NavLink>
                {
                isadmin ? 
                <>
                <NavLink className='createaccount-btn' to='/report'>Show Borrowed Books</NavLink>  
                <button onclick={showAddBook}>Add Book</button> 
                </>
                :
                <></>
                }
                <NavLink className='login-btn' to='/booklist'>My Booklist</NavLink> 
                <button className='plain-btn-underlined' onclick={logOutUser}>Log Out</button> 
            </div>
        </div>
    </div>
}

export default usernav