const express = require('express');
const router = express.Router();

const {authenticateUser} = require('../../auth')

const {getLibraryContent, getBookList} = require('../../library')

const {borrowBook, returnBook, addBook, deleteBook} = require('../../book')

const db = require('../../dbinstance');

const notAdmin = (res)=>{
    res.json({
        error: true,
        message: 'You do not have admin access'
    })
}

router.get('/contents', async(req,res) =>{
    try{
        const search = 'search' in req.query ? req.query.search : null;

        const content = await getLibraryContent(db.getInstance(), search)
        
        res.json({
            content
        })
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})

router.get('/reports', authenticateUser, async(req,res) =>{
    try{
        if(req.user_verified.isadmin){
            const reports = await getBookList({report: true},db.getInstance())
            res.json({
                reports
            })
        }
        else{
            notAdmin(res)
        }
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})

router.get('/booklist', authenticateUser, async(req,res) =>{
    try{
        const reports = await getBookList({userid: req.user_verified._id},db.getInstance())
        res.json({
            reports
        })
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})

router.post('/borrow', authenticateUser, async (req,res) =>{
    try{
        
       const book_borrowed = await borrowBook({...req.body},db.getInstance())
       
       if('error' in book_borrowed) throw new Error(book_borrowed.message)
       
       const remainder_available = await db.getInstance().findOneLibraryBook(book_borrowed.book_id)
       
       if(remainder_available){
            req.app.io.emit('update-client-library', {book:remainder_available})
       }
       else{
            req.app.io.emit('remove-from-client', book_borrowed.book_id)
       }
       
       res.json({
            book: book_borrowed
       })
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})

router.post('/returnbook', authenticateUser, async (req,res) =>{
    try{
        const book_returned = await returnBook({...req.body},db.getInstance())
        
        req.app.io.emit('add-client-library', {book: book_returned})
        res.json({
                book: {_id: `${req.body.bookid}_${req.body.userid}`}
        })
    }
    catch(err){
        console.log(err)
        res.json({
            error: true,
            message: err.message
        })
    }
})

router.post('/addbook', authenticateUser, async (req,res) =>{
    try{
        if(req.user_verified.isadmin){
            const newbook = await addBook({...req.body},db.getInstance())
            req.app.io.emit('add-client-library', {book: newbook})
            
            res.json({
                book: newbook
            })
        }
        else{
            console.log('Add book not allowed...')
            notAdmin(res)
        }
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})

router.delete('/delete/:book', authenticateUser, async (req,res) =>{
    try{
        console.log('Deleting book...')
        if(req.user_verified.isadmin){
            const book_deleted = await deleteBook(req.params.book,db.getInstance())
            
            
            req.app.io.emit('remove-from-client', req.params.book)
            
            res.json({
                book: req.params.book
            })
        }
        else{
            console.log('Delete book not allowed...')
            notAdmin(res)
        }
        
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})
module.exports = router;