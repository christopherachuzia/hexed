import {React} from 'react'

const Borrowedbook = ({book, user, returnBook = f=>f})=>(
    <div className='book-container'>
        <ul className='book'>
            <li className='text-capitalize'><span>Title:</span> {book.book_title}</li>
            <li>
                <button className='return-btn' onClick ={()=>{
                    returnBook(user.email,book.book_id)
                }}>Return Book</button>
            </li>
        </ul>
    </div>
)

export default Borrowedbook