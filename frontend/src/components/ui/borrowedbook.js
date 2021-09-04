import {React} from 'react'
import '../../index.css'

const borrowedbook = ({book_title, _id}, {email}, returnBook = f=>f)=>(
    <div className='book-container'>
        <ul className='book'>
            <li>Title: {book_title}</li>
            <li>
                <button className='borrow-btn' onclick ={()=>{
                    returnBook(email,_id)
                }}>Return Book</button>
            </li>
        </ul>
    </div>
)

export default borrowedbook