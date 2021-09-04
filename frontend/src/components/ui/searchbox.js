import {React} from 'react'
import '../../index.css'

const searchbox = (searchBook)=>(
    <div className='search-box'>
        <input className='search-textfield' placeholder='Search Book...' oninput={(e)=>{
            e.preventDefault();
            console.log(e.target)
            const searchdata = e.target.value
            searchBook(searchdata)
        }}/>
    </div>
)

export default searchbox