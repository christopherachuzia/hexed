const express = require('express');
const router = express.Router();

const {authenticateUser} = require('../../auth')

const {getLibraryContent, getBookList} = require('../../library')

const {borrowBook, returnBook, addBook, removeBook} = require('../../book')

const db = require('../../dbinstance');

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
        
        throw new Error('You do not have admin access')
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
       const remainder_available = await db.getInstance().findOneBook(book_borrowed.book_id)
       
       if(remainder_available){
            req.io.emit('update-client-library', {book:remainder_available})
       }
       else{
            req.io.emit('remove-from-client', {book: remainder_available})
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
       req.io.emit('update-client-library', {book: book_returned})
       res.json({
            book: book_returned 
       })
    }
    catch(err){
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
            req.io.emit('update-client-library', {book: newbook})
            res.json({
                book: newbook
            })
        }
        
        throw new Error('You do not have admin access')
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

        if(req.user_verified.isadmin){
            const book_deleted = await removeBook({book_id: req.params.book},db.getInstance())
            
            
            req.io.emit('remove-from-client', {book: {book_id: book}})
            
            res.json({
                book: {book_id: book}
            })
        }
        
        throw new Error('You do not have admin access')
    }
    catch(err){
        res.json({
            error: true,
            message: err.message
        })
    }
})
module.exports = router;