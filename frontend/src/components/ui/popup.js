import {React} from 'react'
import Login from './login'
import Createaccount from './createaccount'
import Addbook from './addbook'

import '../../index.css'

const Popup = ({screen, cancelOverlay, createUser, loginUser})=>(
    <div className='overlay'>
        <div className='center-fixed-div'>
            {
                screen === 0 ?
                <Login cancelOverlay={cancelOverlay} loginUser={loginUser}/> : screen === 1 ?
                <Createaccount cancelOverlay={cancelOverlay} createUser={createUser}/> : screen === 2 ? <Addbook cancelOverlay={cancelOverlay} /> : <></>
            }
        </div>
    </div>
)

export default Popup