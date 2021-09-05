import {React} from 'react';

import Searchbox from './searchbox';
import Usernav from './usernav';
import Visitor from './visitor';
import { withRouter } from 'react-router';

const Navcontent = ({location, user,showCreateAccount,showLogin,showAddBook,logOutUser,searchBook})=>(
    <div>
        <div>
            {
                // localStorage['user-token'] ?
                user.name ?
                <Usernav user={user} showAddBook={showAddBook} logOutUser={logOutUser}/> 
                : <Visitor showCreateAccount={showCreateAccount} showLogin={showLogin}/>
            }
        </div>
        <>
        {
           location.pathname === '/' ?
           <Searchbox className='mt-1' searchBook={searchBook}/> :
           <></>
        }
        
        </>
    </div>
)

export default withRouter(Navcontent)