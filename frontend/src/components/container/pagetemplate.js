import {React} from 'react'
import Popup from '../ui/popup'
import Header from './header'

const Pagetemplate = ({children, screen, cancelOverlay}) =>(
    <div>
        {
            screen !== -1 ? 
            <Popup screen={screen} cancelOverlay={cancelOverlay}/> : <></>
        }
        <Header/>
        <div className='content-holder'>
            {children}
        </div>
        
    </div>
)

export default Pagetemplate