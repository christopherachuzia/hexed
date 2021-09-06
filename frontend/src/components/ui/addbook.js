import {React, useState} from 'react'

const Addbook = ({cancelOverlay= f=>f,addNewBook=f=>f})=>{

    const [title,setTitle] = useState('');
    const [amount, setAmount] = useState('');

    const onInput = (e)=>{
        e.preventDefault()
        const type = e.target.name
        const value = e.target.value
        if(type === 'title'){
            setTitle(value)
        }
        else{
            setAmount(value)
        }
    }
    return (
    <form className='overlay-content' onSubmit={(e)=>{
        e.preventDefault()
        console.log(title+' '+amount)
        addNewBook(title,amount)
    }}>
        <div>
            Add Book
        </div>
        <div className='mt-1'>
            <input placeholder='Title' value={title} name='title'
            required onInput={onInput}/>
        </div>
        <div className='mt-1'>
            <input placeholder='Amount' type='number' name={amount}
            required value={amount} onInput={onInput}/>
        </div>
        <div className='overlay-btn-holder'>
            <button className='login-btn'>Add Book</button>
            <button className='delete-btn-fill' key='canceladd' onClick={()=>{
                cancelOverlay();
            }}>Cancel</button>
        </div>
    </form>
    )
}

export default Addbook