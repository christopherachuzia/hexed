import {React} from 'react'
import '../../index.css'

const book = ({_id, book_title, amount}, {email,isadmin}, borrowBook = f => f)=>(
    <div className='book-container'>
        <ul className='book'>
            {
                isadmin ? <li><button className='delete-btn-fill'>Delete</button></li> : <></>
            }
            <li className='text-capitalize'>Title: {book_title}</li>
            <li className='text-capitalize'>Copies: {amount}</li>
            <li>
                <button className='borrow-btn' onclick ={()=> {
                    borrowBook(email,_id)
                }}>Borrow Book</button>
            </li>
        </ul>
    </div>
)

export default book
