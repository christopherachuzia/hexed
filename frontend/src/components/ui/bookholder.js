import {React, useEffect} from 'react';
import Book from './book'
import Pagetemplate from '../container/pagetemplate'
import Error from './errorpage'


const Bookholder = ({bookdata, screen, user, loading, loadlibrary,
     borrowBook, onloadBook, cancelOverlay, 
     createUser, loginUser, addNewBook,
     deleteBook})=>{

    useEffect(()=>{
        if(loading && loadlibrary){
            onloadBook()
        }
    })
    
    return (
        
        <Pagetemplate screen={screen} cancelOverlay={cancelOverlay} loginUser={loginUser} 
        createUser={createUser} addNewBook={addNewBook}>
            {
                loading ? <h2 className='text-center'>Loading Library...</h2>
                :
                (bookdata.length === 0)?
                <Error text='No Book Found'/> :
                'error' in bookdata[0] ?
                <Error text={bookdata[0].error}/> :
                bookdata.sort((a,b) =>{
                    return (a._id < b._id) ? -1 : 1
                }).map((value,i)=> <Book key={`book${i}`} book={value} user={user} borrowBook={borrowBook}
                deleteBook={deleteBook}/>)
            }
        </Pagetemplate>
    )
}

export default Bookholder