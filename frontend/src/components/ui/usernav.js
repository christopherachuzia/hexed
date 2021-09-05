import {React} from 'react';
import {NavLink} from 'react-router-dom'

const Usernav = ({user,showAddBook,logOutUser})=>(
    <div className='user-nav'>
        <div className='user-holder'>
            <div className='text-capitalize text-right'>
                <span className='welcome-span'>Welcome</span> {user.name} <button className='btn-1 login-btn' onclick={logOutUser}>Log Out</button> </div>
            <div>
            {
                user.isadmin ? 
                <>
                <button className="btn-1 login-btn" onClick={()=>{showAddBook()}}>Add Book</button> 
                <NavLink className='btn ' to='/report'>Show Borrowed Books</NavLink>  
                </>
                :
                <></>
                }
                <NavLink className='btn' to='/'>View Library</NavLink>
                
                <NavLink className='btn ' to='/booklist'>My Booklist</NavLink> 
                
            </div>
        </div>
    </div>
)

export default Usernav