const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs')

require('dotenv').config();

function verifyToken(token){
    return new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.SECRET_KEY, (err, data) =>{
            
            if(err){
                reject(new Error('Error verifying user token'))
            }

            
            resolve(data)
        })
    })
}

function signUserToken(user){
    return new Promise((resolve,reject) =>{
        jwt.sign(user, process.env.SECRET_KEY, (err,token)=>{

            if(err){
                reject({
                    error: true,
                    message: 'Error creating authentication token'
                })
            }

            resolve({
                success: true,
                token
            })
        })
    })
}

module.exports = {
    

    authenticateUser: async function(req, res, next){
        try{
            const bearer_header =  req.headers['authorization'];
        
            if( bearer_header !== undefined ){
                const token = bearer_header.split(' ')[1];

                const data = await verifyToken(token);
                req.user_verified = data;
                next()
            }
            else{
                throw new Error('Token does not exist')
            }
        }
        catch(err){
            res.json({
                auth: false
            })
        }
    },

    createUser: async (req, res, db) =>{
        try{
            const existing_user_data = await db.findOneUser({
                ...req.body
            })

            if(existing_user_data === undefined){
                const hashed_password = bcrypt.hashSync(req.body.password, 10);
                
                const saved_user_data = await db.saveOneUser({...req.body, password:hashed_password})
                const user_data_token = await signUserToken(saved_user_data)
                
                res.json({...user_data_token})
            }else{
                res.json({
                    error: true,
                    message: 'email already exist'
                })
            }
        }
        catch(err){
            
            res.json({
                error: true,
                message: 'Internal error occoured'
            })
        }
    },

    logInUser: async (req, res, db) =>{
        try{
            const existing_user_data = await db.findOneUser({
                ...req.body
            })

            if(existing_user_data !== undefined){
                const is_correct_password = bcrypt.compareSync(req.body.password, existing_user_data.password);
                if(is_correct_password){
                    const {password, ...user_data} = existing_user_data;
                    
                    const user_data_token = await signUserToken(user_data)
                    res.json({...user_data_token})
                }
                else{
                    res.json({
                        error: true,
                        message: 'Invalid password'
                    })
                }
            }
            else{
                res.json({
                    error: true,
                    message: 'User email does not exist'
                })
            }
        }
        catch(err){
            res.json({
                error: true,
                message: 'Internal error occoured'
            })
        }
    }
}