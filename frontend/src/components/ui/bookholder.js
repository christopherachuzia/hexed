import {React, useEffect} from 'react';
import Book from './book'
import Pagetemplate from '../container/pagetemplate'
import Error from './errorpage'

const Bookholder = ({bookdata, screen, user, loading,
     borrowBook, onloadBook, cancelOverlay})=>{

    useEffect(()=>{
        if(loading){
            onloadBook()
        }
    })
    
    return (
        
        <Pagetemplate screen={screen} cancelOverlay={cancelOverlay} >
            {
                loading ? <h2 className='text-center'>Loading Library...</h2>
                :
                bookdata.length ?
                bookdata.sort((a,b) =>{
                    return (a._id < b._id) ? -1 : 1
                }).map(value => <Book book={value} user={user} borrowBook={borrowBook}/>)
                :
                <Error text='No Book Found'/>
            }
        </Pagetemplate>
    )
}

export default Bookholder