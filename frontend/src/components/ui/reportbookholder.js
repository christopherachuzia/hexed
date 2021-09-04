import {React} from 'react';
import Reportbook from './reportbook'
import Pagetemplate from '../container/pagetemplate'

const reportbookholder = (bookdata, loading)=>(
    <Pagetemplate>
        {
            loading ? <h1>Loading Reports...</h1>
            :
            bookdata.sort((a,b) =>{
                return (a._id < b._id) ? -1 : 1
            }).map(value => <Reportbook data={value} />)
        }
    </Pagetemplate>
)

export default reportbookholder