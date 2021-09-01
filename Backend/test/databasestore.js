// const Chai = require('chai');

// const assert = Chai.assert;
// const expect = Chai.expect;
// const should = Chai.should();

// const bcrypt = require('bcryptjs')

// const useEngine = require('../db')

// let db;

// describe('Database Test', function(){
//     describe('Initialize StoreEngine',  function(){
//         this.timeout(2000000);
//         it('Should initialize database using mongodb datastore', async function(){
//             try{
//                 db = await useEngine('mongodb');
//             }
//             catch(err){
//                 console.log(err.message)
//                 throw err;
//             }
//         })
//     })
// })

// describe('Database Methods Test', function(){
//     describe('Add and find user Test', function(){
//         let hashed_password;
//         before(async ()=>{
//             hashed_password = bcrypt.hashSync('123456', 10);
//             await db.saveOneUser({
//                 email:'christopherachuzia@gmail.com',
//                 name: 'Christopher Achuzia',
//                 password: hashed_password
//             })

//             await db.saveOneUser({
//                 email:'jessicaibeanusi@gmail.com',
//                 name: 'Jessica Ibeanusi',
//                 password: hashed_password
//             })
//         })

//         it('Should find users', async function(){
//             let user1 = await db.findOneUser({email:'christopherachuzia@gmail.com'})
//             let user2 = await db.findOneUser({email:'jessicaibeanusi@gmail.com'})
//             assert.deepEqual(user1,{
//                 _id:'christopherachuzia@gmail.com',
//                 email:'christopherachuzia@gmail.com',
//                 name: 'Christopher Achuzia',
//                 password: hashed_password
//             })

//             assert.deepEqual(user2,{
//                 _id:'jessicaibeanusi@gmail.com',
//                 email:'jessicaibeanusi@gmail.com',
//                 name: 'Jessica Ibeanusi',
//                 password: hashed_password
//             })
            
//         })

//         it('Should return undefined if user not found', async function(){
//             let user = await db.findOneUser({email:'mike@gmail.com'})

//             expect(user).equal(undefined);
//         })
//     })

//     describe('#readLibrary() Test', function(){
//         it('Should return an empty library', async function(){
//             const library = await db.readLibrary('intro to python');
//             library.should.be.empty;
//         })

//         it('Should return all books in library', async function(){
//             const library = await db.readLibrary()
//             library.should.have.lengthOf(5);
//         })

//         it('Should return library of searched books', async function(){
//             const library = await db.readLibrary('intro to')
//         })
//     })

//     describe('readBorrowedBook() Test',function(){
//         before(()=>{
//             await db.updateStore({
//                 action: 'add',
//                 data:{
//                     book:{
//                         _id:'beginningtestwithjest120902',
//                         book_id: 'beginningtestwithjest120902',
//                         book_title: 'Jest Framework'
//                     }
//                 }
//             })

//             await db.updateStore({
//                 action: 'add',
//                 data:{
//                     book:{
//                         _id:'phpforprofessional10010',
//                         book_id: 'phpforprofessional10010',
//                         book_title: 'Master PHP 7 & MySQL'
//                     }
//                 }
//             })

//             await db.updateStore({
//                 action: 'add',
//                 data:{
//                     book:{
//                         _id:'rubyonrails11222',
//                         book_id: 'rubyonrails11222',
//                         book_title: 'Ruby on Rails'
//                     }
//                 }
//             })

//             await db.updateStore({
//                 action: 'borrow',
//                 data:{
//                     book:{
//                         _id:'beginningtestwithjest120902',
//                         book_id: 'beginningtestwithjest120902',
//                         book_title: 'Jest Framework',
//                         amount: 3
//                     },
//                     _id: 'beginningtestwithjest120902_jessicaibeanusi@gmail.com',
//                     book_id: 'beginningtestwithjest120902',
//                     user_id: 'jessicaibeanusi@gmail.com'
//                 }
//             })

//         })
//         it('Should return empty user booklist', async function(){
//             let booklist = await db.readBorrowedBook({userid: 'christopherachuzia@gmail.com'})

//             expect(booklist).to.be.empty
//         })

//         it('Should ')
//     })
// })