import {React} from 'react'
import Popup from '../ui/popup'
import Header from './header'

const Pagetemplate = ({children, screen, cancelOverlay, 
    createUser, loginUser, addNewBook}) =>(
    <div>
        {
            screen !== -1 ? 
            <Popup screen={screen} 
            addNewBook={addNewBook} 
            cancelOverlay={cancelOverlay} 
            loginUser={loginUser} 
            createUser={createUser}/> : <></>
        }
        <Header/>
        <div className='content-holder'>
            {children}
        </div>
        
    </div>
)

export default Pagetemplate