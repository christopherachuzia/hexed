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

    async readLibrary(filterbook = null){
        try{
            await connectDB();
            let value;
            if(filterbook){
                value = await db().collection('available').findOne({
                    _id: filterbook._id
                })
                return value
            }
        
            const cursor = await db().collection('available').find({
                amount :{
                    $gt: 0
                }
            })

            value = cursor.toArray()

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
                    db().collection('available')
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