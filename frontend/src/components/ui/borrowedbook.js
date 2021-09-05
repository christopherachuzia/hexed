import {React} from 'react'

const Borrowedbook = ({book, user, returnBook = f=>f})=>(
    <div className='book-container'>
        <ul className='book'>
            <li>Title: {book.book_title}</li>
            <li>
                <button className='borrow-btn' onclick ={()=>{
                    returnBook(user.email,book._id)
                }}>Return Book</button>
            </li>
        </ul>
    </div>
)

export default Borrowedbook