import {React, useEffect} from 'react';
import Book from './book'
import Pagetemplate from '../container/pagetemplate'
import Error from './errorpage'
import {socket} from '../../utils/socketclient'

const Bookholder = ({bookdata, screen, user, loading, loadlibrary,
     borrowBook, onloadBook, cancelOverlay, createUser, loginUser, updateBook})=>{

    useEffect(()=>{
        if(loading && loadlibrary){
            onloadBook()
        }

        socket.on('connect',()=>{
            console.log('hi there')
        })
        socket.emit('refresh', 'hello')
        console.log('hello',socket)
    })

    useEffect(()=>{
        socket.on('welcome',()=>{
            console.log('hi there')
        })

        
        console.log(socket,'here now')
        // socket.on('update-client-library',({book})=>{
        //     updateBook(book, 'update')
        // })
          
        // socket.on('remove-from-client', _id =>{
        //     updateBook(_id, 'remove')
        // })
    },[])
    
    return (
        
        <Pagetemplate screen={screen} cancelOverlay={cancelOverlay} loginUser={loginUser} createUser={createUser} >
            {
                loading ? <h2 className='text-center'>Loading Library...</h2>
                :
                (bookdata.length === 0)?
                <Error text='No Book Found'/> :
                'error' in bookdata[0] ?
                <Error text={bookdata[0].error}/> :
                bookdata.sort((a,b) =>{
                    return (a._id < b._id) ? -1 : 1
                }).map((value,i)=> <Book key={`book${i}`} book={value} user={user} borrowBook={borrowBook}/>)
            }
        </Pagetemplate>
    )
}

export default Bookholder