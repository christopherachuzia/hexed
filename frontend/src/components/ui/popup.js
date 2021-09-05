import {React} from 'react'
import Login from './login'
import Createaccount from './createaccount'
import Addbook from './addbook'

import '../../index.css'

const Popup = ({screen, cancelOverlay})=>(
    <div className='overlay'>
        <div className='center-fixed-div'>
            {
                screen === 0 ?
                <Login cancelOverlay={cancelOverlay}/> : screen === 1 ?
                <Createaccount cancelOverlay={cancelOverlay}/> : screen === 2 ? <Addbook cancelOverlay={cancelOverlay} /> : <></>
            }
        </div>
    </div>
)

export default Popup