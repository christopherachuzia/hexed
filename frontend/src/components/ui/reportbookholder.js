import {React,useEffect} from 'react';
import Reportbook from './reportbook'
import Pagetemplate from '../container/pagetemplate'
import Error from './errorpage';

const Reportbookholder = ({bookdata, loading, loadreport, screen, 
    cancelOverlay, addNewBook, onloadReport})=>{
        useEffect(()=>{
            if(loading && loadreport){
                onloadReport()
            }
        })
        return(
            <Pagetemplate screen={screen} addNewBook={addNewBook}
            cancelOverlay={cancelOverlay}>
                <div className='book-container'>
                    <div className='heading'>
                        Borrowed Books Report
                    </div>
                </div>
                {
                    loading ? <h2 className='text-center'>Loading Reports...</h2>
                    :
                    (bookdata.length === 0)?
                    <Error text='No Book Found'/> :
                    'error' in bookdata[0] ?
                    <Error text={bookdata[0].error}/> :
                    bookdata.sort((a,b) =>{
                        return (a._id < b._id) ? -1 : 1
                    }).map((value,i) => <Reportbook key={i} book={value} />)
                }
            </Pagetemplate>
        )
    }

export default Reportbookholder