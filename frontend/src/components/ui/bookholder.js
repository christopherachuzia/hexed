import {React} from 'react';
import Book from './book'
import Pagetemplate from '../container/pagetemplate'

const bookholder = (bookdata, screen, user, loading, borrowBook)=>(
    <Pagetemplate screen={screen}>
        {
            loading ? <h1>Loading Library...</h1>
            :
            bookdata.sort((a,b) =>{
                return (a._id < b._id) ? -1 : 1
            }).map(value => <Book data={value} user={user} borrowBook={borrowBook}/>)
        }
    </Pagetemplate>
)

export default bookholder