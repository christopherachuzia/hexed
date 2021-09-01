const DBInterface = require('../../dbinterface')

const {MongoClient} = require('mongodb'); 

require('dotenv').config();

let client;

const connectDB = async () => { 
    try{
        if (!client) {
            client = await new MongoClient(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).connect();
        } 
    }
    catch(err){
        console.log(err.message)
    }
}

const db = () => client.db(process.env.MONGO_DBNAME)

const sendError = (msg)=> {
    throw new Error(msg)
}

const createTextIndex = async () =>{
    try{
        const exist = await db().collection('available').indexExists("text")
        if(!exist){
            await db().collection('available').createIndex( { book_title : "text"} )
        }
    }
    catch(err){
        console.log('Error creating text index')
    }
}

class MongoDBEngine extends DBInterface{
   
    async saveOneUser(user){
        try{
            await connectDB();
            const data = {
                _id: user.email.toLowerCase(),
                email: user.email.toLowerCase(),
                name: user.name,
            }
    
            await db().collection('user').insertOne({
                ...data, 
                password: user.password,
            })
            
            return data
        }
        catch(err){
            sendError('Error saving user')
        }
    }

    async findOneUser(user){
        try{
            await connectDB();

            const value = await db().collection('user').findOne({
                _id: user.email.toLowerCase()
            })
            
            return value ? value : undefined;
        }
        catch(err){
            sendError('Error finding user')
        }
    }

    async readBorrowedBook(filterbook = null){

    }

    async findOneBook(book){
        try{
            await connectDB()
            const value = await db().collection('available').findOne({
                _id: book.bookid
            })
            
            return value;
        }
        catch(err){
            return sendError('Error finding book')
        }
    }

    async readLibrary(search = null){
        try{
            await connectDB();
            let cursor;
            if(search){
                await createTextIndex()
                cursor =  await db().collection('available').find({
                    $text: {$search : `"${search}"`},
                    amount:{
                        $gt: 0
                    }
                })
            }
            else{
                cursor = await db().collection('available').find({
                    amount :{
                        $gt: 0
                    }
                })
            }
        
            const value = cursor.toArray()

            cursor.close()

            return value
        }
        catch(err){
            sendError('Error reading library')
        }
        
    }

    async updateStore(payload){
        try{
            const {action, data} = payload;
            switch(action){
                case 'add':
                    await db().collection('available').updateOne(
                        {
                            _id: data.book._id
                        },
                        {
                           $inc: {amount:1} 
                        },
                        {
                            upsert: true
                        }
                    )
                    break;
                case 'delete':

                    break;
                case 'borrow':
                    break;
                case 'return':
                    break;
                default: return Promise.reject('No supported action found')
            }
        }
        catch(err){
            sendError('Error updating store')
        }
    }
}

module.exports = MongoDBEngine