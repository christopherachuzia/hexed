import {React} from 'react'

const Book = ({book, user, borrowBook = f => f})=>(
    <div className='book-container'>
        <ul className='book'>
            
            <li className='text-capitalize'><span>Title:</span> {book.book_title}</li>
            <li className='text-capitalize'><span className='small-font' >Available copies:</span> <b>{book.amount}</b></li>
            <li>
                <div className='overlay-btn-holder'>
                    <button className='borrow-btn' onClick ={()=> {
                        borrowBook(user.email,book._id)
                    }}>Borrow Book</button>

                    {
                        user.isadmin ? <button className='delete-btn-fill-1'>Delete</button> : <></>
                    }
                </div>
            </li>
        </ul>
    </div>
)

export default Book
