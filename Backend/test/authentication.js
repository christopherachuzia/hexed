const Chai = require('chai');
const bcrypt = require('bcryptjs');

const expect = Chai.expect;
const assert = Chai.assert;

const jwt =  require('jsonwebtoken')

const {authenticateUser, createUser, logInUser} = require('../auth');

require('dotenv').config()

let req, res, next, token ;

const hashed_password = bcrypt.hashSync('12345', 10);

let mock_database = {
    data_records: [
        {name:'Christopher', _id:'christopherachuzia@gmail.com', email: 'christopherachuzia@gmail.com', password: hashed_password},
    ],
    findOneUser:  function(input){
        const value = this.data_records.find(data => data._id === input.email)
        
        return Promise.resolve(value)
    },
    saveOneUser: function(input){
        this.data_records = [...this.data_records, {...input}];
        return Promise.resolve({name:input.name, _id: input.email, email: input.email})
    },

}

describe('Authentication Test', function(){
    describe('#authenticateUser() Test', function(){
    
        let user;
        before(()=>{
            user = {
                name: "Christopher",
                _id: 'christopherachuzia@gmail.com',
                email: 'christopherachuzia@gmail.com'
            }
            
            token = jwt.sign(user, process.env.SECRET_KEY);
    
            
            req = {
                headers: {}
            }
    
            res = {
                json:(data) => data,
            }
    
            next = ()=>{}
        })
    
        afterEach(() =>{
            req = {
                headers: {}
            }
        })
    
        it("Should fail if user has no authentication token", async function(){
            await authenticateUser(req, res, next)
            expect(req.user_verified).to.equal(undefined)
        })
    
        it("Should pass if user authentication is valid", async function(){
    
            req = {
                headers:{
                    authorization: `Bearer ${token}`
                }
            } 
    
            await authenticateUser(req, res, next)
            const {iat, ...user_verified_data} = req.user_verified;
            assert.deepEqual(user_verified_data, user)
        })
    
        it("Should fail if user authentication token is invalid", async function(){
            const invalid_token = 'jsu bdfsdjdjksald dljsa';
    
            req = {
                headers:{
                    authorization: `Bearer ${invalid_token}`
                }
            }
    
            await authenticateUser(req, res, next);
            expect(req.user_verified).to.equal(undefined)
        })
    
    })
    
    describe('#createUser() Test', function(){
       
        before(() =>{
    
            res = {
                json:function(data){
                    this.client_response = data;
                },
    
                client_response: null
            }
        })
    
        afterEach(()=>{
            res.client_response = null;
        })
    
        it('Should fail because email already exist', async function(){
            
            req = {
                body:{
                    email:'christopherachuzia@gmail.com',
                    name: 'Paul Mike',
                    password: 'qwerty'
                }
            }
    
            
            const handeler = createUser(mock_database)
            await handeler(req,res)

            assert.deepEqual(res.client_response, {
                error: true,
                message: 'email already exist'
            })
        });
    
        it('Should create a new user', async function(){
    
            req = {
                body:{
                    email:'jessicaibeanusi@gmail.com',
                    name: 'Jessica',
                    password: 'asdfgh'
                }
            }
    
            
            const handeler = createUser(mock_database)
            await handeler(req,res)
    
            token = jwt.sign({
                name: 'Jessica',
                _id: 'jessicaibeanusi@gmail.com',
                email: 'jessicaibeanusi@gmail.com'
            }, process.env.SECRET_KEY);
    
            assert.deepEqual(res.client_response, {
                success: true,
                isadmin: false,
                token
            })
        })
    })
    
    describe('LogInUser Test', function(){
        let user;
        before(()=>{
            user = {
                name: "Christopher",
                _id: 'christopherachuzia@gmail.com',
                email: 'christopherachuzia@gmail.com'
            }
            
    
            res = {
                json:function(data){
                    this.client_response = data;
                },
    
                client_response: null
            }
        })
    
        afterEach(()=>{
            res.client_response = null;
        })
    
        it('Should fail to login due to incorrect credentials', async function(){
            req = {
                body:{
                    email: 'christopherachuzia@gmail.com',
                    password: '123455'
                }
            }
    
            const handeler = logInUser(mock_database);
            await handeler(req,res)
    
            assert.deepEqual(res.client_response,{
                error: true,
                message: 'Invalid password'
            })
        })
    
        it('Should fail because email does not exist', async function(){
            req = {
                body:{
                    email: 'braincabone@yahoo.com',
                    password: '09876'
                }
            }
    
            const handeler = logInUser(mock_database);
            await handeler(req,res)
    
            assert.deepEqual(res.client_response,{
                error: true,
                message: 'User email does not exist'
            })
        })
    
        it('Should login user', async function(){
            req = {
                body:{
                    email: 'christopherachuzia@gmail.com',
                    password: '12345'
                }
            }
    
            const handeler = logInUser(mock_database);
            await handeler(req,res)
    
            token = jwt.sign(user, process.env.SECRET_KEY);
    
            assert.deepEqual(res.client_response,{
                success: true,
                isadmin: false,
                token
            })
        })
    })
})
