import {React} from 'react'

const Reportbook = ({bookreport})=>(
    <div className='book-container'>
        <ul className='book'>
            <li className='text-capitalized'>Title: {bookreport._id}</li>
            <li>Borrowed By: {bookreport.users} Users</li>
        </ul>
    </div>
)

export default Reportbook