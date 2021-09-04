import {React} from 'react'
import '../../index.css'

const reportbook = ({_id, users})=>(
    <div className='book-container'>
        <ul className='book'>
            <li className='text-capitalized'>Title: {_id}</li>
            <li>Borrowed By: {users} Users</li>
        </ul>
    </div>
)

export default reportbook