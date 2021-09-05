import {React} from 'react'

const Searchbox = ({searchBook})=>(
    <div className='search-nav'>
        <div className='search-box'>
            <input className='search-textfield' placeholder='Search Book...' onInput={(e)=>{
                e.preventDefault();
                const searchdata = e.target.value
                searchBook(searchdata)
            }}/>
        </div>
    </div>
)

export default Searchbox