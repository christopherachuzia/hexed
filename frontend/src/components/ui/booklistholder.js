import {React} from 'react';
import Borrowedbook from './borrowedbook'
import Pagetemplate from '../container/pagetemplate'

    const Booklistholder = ({bookdata, screen, user, 
        loading, returnBook, cancelOverlay
    })=>(
    <Pagetemplate screen={screen} cancelOverlay={cancelOverlay}>
        {
            loading ? <h1>Loading My Booklist...</h1>
            :
            bookdata.sort((a,b) =>{
                return (a._id < b._id) ? -1 : 1
            }).map(value => <Borrowedbook data={value} user={user} returnBook={returnBook}/>)
        }
    </Pagetemplate>
)

export default Booklistholder