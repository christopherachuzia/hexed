import {React} from 'react';

const Usernav = ({user, history, showAddBook = f=>f
    ,logOutUser=f=>f, showReports=f=>f, 
    showHome=f=>f, showBooklist=f=>f})=>(
    <div className='user-nav'>
        <div className='user-holder'>
            <div className='text-capitalize text-right'>
                <span className='welcome-span'>Welcome</span> {user.name} <button className='btn-1 login-btn' onClick={logOutUser}>Log Out</button> </div>
            <div>
            {
                user.isadmin ? 
                <>
                <button className="btn-1 login-btn" onClick={()=>{showAddBook()}}>Add Book</button> 
                <button className='btn' onClick={()=>{
                    showReports()
                    history.push('/report')
                }}>Show Borrowed Books</button>  
                </>
                :
                <></>
                }
                <button className='btn' onClick={()=>{
                    showHome()
                    history.push('/')
                }}>View Library</button>
                
                <button className='btn' onClick={()=>{
                    showBooklist()
                    history.push('/booklist')
                }}>My Booklist</button> 
                
            </div>
        </div>
    </div>
)

export default Usernav