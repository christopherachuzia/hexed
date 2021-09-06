import {React} from 'react'

const Reportbook = ({book})=>(
    <div className='book-container'>
        <ul className='book'>
            <li className='text-capitalize'><span>Title:</span> {book.titles[0]}</li>
            <li><span className='small-font'>Borrowed By:</span> <b>{book.users}</b> {book.users > 1 ? 'Users':'User'}</li>
        </ul>
    </div>
)

export default Reportbook