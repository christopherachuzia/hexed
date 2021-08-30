const Chai = require('chai');

const expect = Chai.expect;
const assert = Chai.assert;

const jwt =  require('jsonwebtoken')

const {verifyToken, createUser, logInUser} = require('../auth');

require('dotenv').config()

let req, res, next, token ;

let mock_database = {
    data_records: [
        {_id:'christopherachuzia@gmail.com', name:'Christopher', password: '12345'},
    ],
    read:  (input) =>{
        const {password, ...read_result} = data_records.find(data => input.email)
        Promise.resolve({...read_result})
    },
    save: (input) => {
        data_records = [...data_records, {...data}];
        return Promise.resolve({name:data.name, _id: data.email, email: data.email})
    }
}

describe('VerifyToken Test', function(){
    

    before(()=>{
        const user = {
            name: "Christopher",
            _id: 'christopherachuzia@gmail.com',
            email: 'christopherachuzia@gmail.com'
        }
        
        token = jwt.sign(user, process.env.SECRET_KEY);

        
        req = {
            headers: {}
        }

        res = {
            json:(data) =>{
                console.log('Server response:', data)
            },
        }

        next = ()=>{}
    })

    afterEach(() =>{
        req = {
            headers: {}
        }
    })

    it("Should fail if user has no authentication token", function(){
        verifyToken(req, res, next)
        
        expect(req.user_verified).to.equal(undefined)
    })

    it("Should pass if user authentication is valid", function(){

        req = {
            headers:{
                authorization: `Bearer ${token}`
            }
        } 

        verifyToken(req, res, next)

        assert.deepEqual(req.user_verified, user)
    })

    it("Should fail if user authentication token is invalid", function(){
        const invalid_token = 'jfkdijajHIHiHkhjads';

        req = {
            headers:{
                authorization: `Bearer ${invalid_token}`
            }
        }

        verifyToken(req, res, next);
        expect(req.user_verified).to.equal(undefined)
    })
})

describe('CreateUser Test', function(){
   
    before(() =>{

        token = jwt.sign({
            name: 'Jessica',
            _id: 'jessicaibeanusi@gmail.com',
            email: 'jessicaibeanusi@gmail.com'
        }, process.env.SECRET_KEY);

        res = {
            json:(data) =>{
                client_response = data;
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

        
        await createUser(req, res, mock_database)

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


        await createUser(req, res, mock_database)

        assert.deepEqual(res.client_response, {
            success: true,
            message: 'user account created successfully',
            token
        })
    })
})

describe('LogInUser Test', function(){
    before(()=>{
        const user = {
            name: "Christopher",
            _id: 'christopherachuzia@gmail.com',
            email: 'christopherachuzia@gmail.com'
        }
        
        token = jwt.sign(user, process.env.SECRET_KEY);

        res = {
            json:(data) =>{
                client_response = data;
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

        await logInUser(req, res, mock_database);

        assert.deepEqual(res.client_response,{
            error: true,
            message: 'Invalid email or password'
        })
    })

    it('Should fail because email does not exist', async function(){
        req = {
            body:{
                email: 'braincabone@yahoo.com',
                password: '09876'
            }
        }

        await logInUser(req, res, mock_database);

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

        await logInUser(req, res, mock_database);

        assert.deepEqual(res.client_response,{
            success: true,
            token
        })
    })
})