const express = require('express');
const cors = require('cors');
const path = require('path');

const DatabaseEngine = require('./db')

const db = require('./dbinstance');

const app = express()

const PORT = process.env.PORT || 5050

process.on('uncaughtException',(err)=>{
    console.log('Application Crashed', err)
})

 
start()

async function start(){
    try{
        const engine = await DatabaseEngine('mongodb')

        db.setDBinstance(engine);

        const AUTH_ROUTES = require('./routes/authentication')
        const LIBRARY_ROUTES = require('./routes/library')

        app.use(express.json())
        app.use(express.urlencoded({extended:false}))
        app.use(cors())

        const http_server = app.listen(PORT, ()=>{
            console.log(`App listening on port ${PORT}`);
        })

        const io = require('socket.io')(http_server,{
            path: '/socket.io'
        })
        
        io.on('connection',(socket)=>{
            console.log('connected', socket.id)
            socket.emit('welcome',1)
            socket.on('refresh',(data)=>{
                console.log('Hii there ',data)
            })

            socket.on("disconnect",()=>{
                console.log('client '+socket.id+' disconnected')
            })
        })

        app.io = io;

        app.use('/api/auth/',AUTH_ROUTES)
        app.use('/api/library/',LIBRARY_ROUTES)
    }
    catch(err){
        console.log('Error starting server',err)
    }
}
