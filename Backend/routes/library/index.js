const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../auth')
const {getLibraryContent, getBookList} = require('../../library')

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


module.exports = router;