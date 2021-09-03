
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
        const result = await db().collection('available').updateOne(
            {
                _id: book.book_id
            },
            {
                $set:{
                    book_id: book.book_id,
                    book_title: book.book_title
                },
                $inc: {amount:book.amount},
                
            },
            {
                upsert: true
            }
        )
        
        const {upsertedId: bookid}  = result
        return result.upsertedCount ? bookid : book.book_id
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

const saveBorrowedBook = async (book)=>{
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
                    _id: "$book_id",
                    titles: {$push: "$book_title"},
                    users: {$sum: 1} 
                },
            },
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
        const borrowed_book_id = await saveBorrowedBook({
            _id: data._id,
            book_id: data.book_id,
            book_title: data.book_title,
            user_id: data.user_id
        })

        if(amount <= 1){
            await deleteAvailableBook(data.book_id)
        }
        else{
            await decreaseAvailableBook(data.book_id)
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
            ...data, amount: 1
        })

        await deleteBorrowedBook(data._id)
        
        return returned_book_id
    }
    catch(err){
        sendError('Error returning book')
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

    async findOneLibraryBook(bookid){
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
                cursor =  await db().collection('available').find({
                    book_title: {$regex : search, $options: 'i'},
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

    async addToBorrowedBook(data){
        try{
            const book_found = await this.findOneLibraryBook(data.book_id)

            if(!book_found) sendError('Book is not available');

            const borrowed_book_id = await borrowBook(data, book_found.amount)
            return await this.findOneBorrowedBook(borrowed_book_id)
        }
        catch(err){
            sendError(err.message+', Error adding to borrowed list')
        }
    }

    async deleteLibraryBook(id){
        try{
            return await deleteAvailableBook(id)
        }
        catch(err){
            sendError(err.message+', Could not delete book')
        }
    }

    async addLibraryBook(data){
        try{
            const bookid = await addAvailableBook(data)
            return await this.findOneLibraryBook(bookid);
        }
        catch(err){
            sendError(err.message+', Could not add book')
        }
    }

    async returnToAvailableBook(data){
        try{
            const borrowed_book_found = await this.findOneBorrowedBook(data._id)

            if(!borrowed_book_found) sendError('Book is not borrowed by user');
            const returned_book_id = await returnBook(data)
            
            return await this.findOneLibraryBook(returned_book_id)
        }
        catch(err){
            sendError(err.message+', Could not return book')
        }
    }
}

module.exports = MongoDBEngine