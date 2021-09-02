
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
        sendError(err.message)
    }
}

const db = () => client.db(process.env.MONGO_DBNAME)

const sendError = (msg)=> {
    throw new Error(msg)
}

const addAvailableBook = async (book)=>{
    try{
        
        await connectDB();
        const {upsertedId: bookid} = await db().collection('available').updateOne(
            {
                _id: book._id
            },
            {
                $set:{
                    book_id: book.book_id,
                    book_title: book.book_title
                },
                $inc: {amount:1},
                
            },
            {
                upsert: true
            }
        )
    
        return bookid
    }
    catch(err){
        sendError('Error adding book')
    }
}

const decreaseAvailableBook = async(id) =>{
    try{
        
        await connectDB();
        const {upsertedId: bookid} = await db().collection('available').updateOne(
            {
                _id: id
            },
            {
                $inc: {amount:-1},
                
            }
        )
    
        return bookid
    }
    catch(err){
        sendError('Error decreasing available book')
    }
}

const deleteAvailableBook = async(id)=>{
    try{
        await connectDB();
        await db().collection('available').deleteOne(
            {
                _id: id
            },
        )
        return true
    }
    catch(err){
        sendError(err.message+', Error deleting available book')
    }
}

const addBorrowedBook = async (book)=>{
    try{
        
        await connectDB();
        const {insertedId: bookid} = await db().collection('borrowed').insertOne(
            {
                ...book
            },
        )
    
        return bookid
    }
    catch(err){
        sendError('Error adding borrowed book')
    }
}

const getBookList = async (userid)=>{
    try{
        await connectDB();
        const cursor = await db().collection('borrowed').find(
            {user_id: userid}
        )
    
        const book_list = await cursor.toArray();
    
        cursor.close();
        
        return book_list
    }
    catch(err){
        sendError('Error getting user booklist')
    }
}

const getReport = async ()=>{
    try{
        await connectDB();
        return await db().collection('borrowed').aggregate([
            {
                $group:
                {
                    _id: "$book_title",
                    users: {$sum: 1} 
                }
            }
        ])
    }
    catch(err){
        console.log(err)
        sendError('Error getting borrowed report')
    }
}

const deleteBorrowedBook = async(id)=>{
    try{
        await connectDB();
        await db().collection('borrowed').deleteOne(
            {
                _id: id
            },
        )
        return true
    }
    catch(err){
        sendError('Error deleting borrowed book')
    }
}


const borrowBook = async (data,amount) =>{
    try{
        const borrowed_book_id = await addBorrowedBook({
            _id: data._id,
            book_id: data.book_id,
            book_title: data.book.book_title,
            user_id: data.user_id
        })

        if(amount <= 1){
            await deleteAvailableBook(data.book.book_id)
        }
        else{
            await decreaseAvailableBook(data.book.book_id)
        }
        return borrowed_book_id
    }
    catch(err){
        sendError('Error borrowing book')
    }
}

const returnBook = async (data)=>{
    try{
        const returned_book_id = await addAvailableBook({
            ...data.book
        })

        await deleteBorrowedBook(data._id)
        
        return returned_book_id
    }
    catch(err){
        sendError('Error returning book')
    }
}

const createTextIndex = async () =>{
    try{
            await db().collection('available').createIndex( { book_title : "text"} )
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
            sendError(err.message+', Error saving user')
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
            sendError(err.message+', Error finding user')
        }
    }

    async readBorrowedBook(filterbook = null){
        try{
            if('userid' in filterbook){
                return await getBookList(filterbook.userid)
            }

            if('report' in filterbook){
                const cursor = await getReport()
                const report = await cursor.toArray()
                cursor.close()
                return report
            }
        }
        catch(err){
            sendError(err.message+', Error finding user')
        }
        
    }

    async findOneBook(bookid){
        try{
            await connectDB()
            const value = await db().collection('available').findOne({
                _id: bookid
            })
            
            return value;
        }
        catch(err){
            sendError(err.message+', Error finding available book')
        }
    }

    async findOneBorrowedBook(bookid){
        try{
            await connectDB()
            const value = await db().collection('borrowed').findOne({
                _id: bookid
            })
            
            return value;
        }
        catch(err){
            sendError(err.message+', Error finding borrowed book')
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
        
            const value = await cursor.toArray()

            cursor.close()

            return value
        }
        catch(err){
            sendError(err.message+', Error reading library')
        }
        
    }

    async updateStore(payload){
        try{
            const {action, data} = payload;
            switch(action){
                case 'add':
                    const bookid = await addAvailableBook(data.book)
                    return await this.findOneBook(bookid);
                case 'delete':
                    return await deleteAvailableBook(data.book.book_id)
                case 'borrow':
                    const book_found = await this.findOneBook(data.book.book_id)

                    if(!book_found) sendError('Book is not available');

                    const borrowed_book_id = await borrowBook(data, book_found.amount)
                    return await this.findOneBorrowedBook(borrowed_book_id)
                case 'return':
                    const borrowed_book_found = await this.findOneBorrowedBook(data._id)

                    if(!borrowed_book_found) sendError('Book is not borrowed by user');
                    const returned_book_id = await returnBook(data)
                    // return await this.findOneBook(data.book.book_id)
                    return await this.findOneBook(returned_book_id)
                    
                default: return Promise.reject('No supported action found')
            }
        }
        catch(err){
            sendError(err.message+', Error updating store')
        }
    }
}

module.exports = MongoDBEngine