import {React} from 'react'
import Header from './header'
import Popup from '../ui/popup'
import '../../index.css'

const pagetemplate = (children) =>(
    <div>
        <Header/>
        <div className='content-holder'>
            {children}
        </div>
        
    </div>
)

export default pagetemplate