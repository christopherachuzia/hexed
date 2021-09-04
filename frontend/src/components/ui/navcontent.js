import {React} from 'react';
import '../../index.css'

import Searchbox from './searchbox';
import Usernav from './usernav';
import Visitor from './visitor';
import { withRouter } from 'react-router';

const navcontent = (location, user,showCreateAccount,showLogin,showAddBook,logOutUser,searchBook)=>(
    <div>
        <div>
            {
                localStorage['user-token'] ? 
                <Usernav user={user} showAddBook={showAddBook} logOutUser={logOutUser}/> 
                : <Visitor showCreateAccount={showCreateAccount} showLogin={showLogin}/>
            }
        </div>
        <>
        {
           location.pathname === '/books' ?
           <Searchbox className='mt-1' searchBook={searchBook}/> :
           <></>
        }
        
        </>
    </div>
)

export default withRouter(navcontent)