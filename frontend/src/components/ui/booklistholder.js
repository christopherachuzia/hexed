import {React} from 'react';
import Borrowedbook from './borrowedbook'
import Pagetemplate from '../container/pagetemplate'

const booklistholder = (bookdata, user, loading, returnBook)=>(
    <Pagetemplate>
        {
            loading ? <h1>Loading My Booklist...</h1>
            :
            bookdata.sort((a,b) =>{
                return (a._id < b._id) ? -1 : 1
            }).map(value => <Borrowedbook data={value} user={user} returnBook={returnBook}/>)
        }
    </Pagetemplate>
)

export default booklistholder