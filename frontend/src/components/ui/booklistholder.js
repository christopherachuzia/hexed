import {React, useEffect} from 'react';
import Borrowedbook from './borrowedbook'
import Pagetemplate from '../container/pagetemplate'
import Error from './errorpage';

    const Booklistholder = ({bookdata, screen, user, 
        loading, loadbooklist, returnBook, 
        cancelOverlay, addNewBook, onloadBooklist
    })=>{
        
        useEffect(()=>{
            if(loading && loadbooklist){
                onloadBooklist()
            }
        })
        return(
            <Pagetemplate screen={screen} addNewBook={addNewBook}
            cancelOverlay={cancelOverlay}>
                <div className='book-container'>
                    <div className='heading'>
                        My Booklist
                    </div>
                </div>
                {
                    loading ? <h2 className='text-center'>Loading My Booklist...</h2>
                    :
                    (bookdata.length === 0)?
                    <Error text='No Book Found'/> :
                    'error' in bookdata[0] ?
                    <Error text={bookdata[0].error}/> :
                    bookdata.sort((a,b) =>{
                        return (a._id < b._id) ? -1 : 1
                    }).map((value,i) => <Borrowedbook key={i} book={value} user={user} 
                    returnBook={returnBook}/>)
                }
            </Pagetemplate>
        )
    }

export default Booklistholder