const Chai = require('chai');

const assert = Chai.assert;
const expect = Chai.expect;
const should = Chai.should();

const bcrypt = require('bcryptjs')

const useEngine = require('../db')

let db;

describe('Database Test', function(){
    describe('Initialize StoreEngine',  function(){
        this.timeout(2000000);
        it('Should initialize database using mongodb datastore', async function(){
            try{
                db = await useEngine('mongodb');
                console.log(db)
            }
            catch(err){
                console.log(err.message)
                throw err;
            }
        })
    })
})

describe('Database Methods Test', function(){
    describe('Add and find user Test', function(){
        let hashed_password;
        before(async ()=>{
            hashed_password = bcrypt.hashSync('123456', 10);
            await db.saveOneUser({
                email:'christopherachuzia@gmail.com',
                name: 'Christopher Achuzia',
                password: hashed_password
            })

            await db.saveOneUser({
                email:'jessicaibeanusi@gmail.com',
                name: 'Jessica Ibeanusi',
                password: hashed_password
            })
        })

        it('Should find users', async function(){
            let user1 = await db.findOneUser({email:'christopherachuzia@gmail.com'})
            let user2 = await db.findOneUser({email:'jessicaibeanusi@gmail.com'})
            assert.deepEqual(user1,{
                _id:'christopherachuzia@gmail.com',
                email:'christopherachuzia@gmail.com',
                name: 'Christopher Achuzia',
                password: hashed_password
            })

            assert.deepEqual(user2,{
                _id:'jessicaibeanusi@gmail.com',
                email:'jessicaibeanusi@gmail.com',
                name: 'Jessica Ibeanusi',
                password: hashed_password
            })
            
        })

        it('Should return undefined if user not found', async function(){
            let user = await db.findOneUser({email:'mike@gmail.com'})

            expect(user).equal(undefined);
        })
    })

    describe('Add Book and readLibrary() Test', function(){
        before(async ()=>{
            await db.addLibraryBook({
                _id:'beginningtestwithjest120902',
                book_id: 'beginningtestwithjest120902',
                book_title: 'jest framework',
                amount: 1
            })

            await db.addLibraryBook({
                _id:'beginningtestwithjest120902',
                book_id: 'beginningtestwithjest120902',
                book_title: 'jest framework',
                amount: 3
            })

            await db.addLibraryBook({
                _id:'beginningtestwithjest120902',
                book_id: 'beginningtestwithjest120902',
                book_title: 'jest framework',
                amount: 1
            })
            
            await db.addLibraryBook({
                _id:'introtojavascript12887',
                        book_id: 'introtojavascript12887',
                        book_title: 'intro to javascript',
                amount: 1
            })

            await db.addLibraryBook({
                _id:'gettingstartedwithphp7_983399',
                book_id: 'gettingstartedwithphp7_983399',
                book_title: 'intro to php 7',
                amount: 2
            })

            await db.addLibraryBook({
                _id:'creatingmicroservicewithspring009288',
                book_id: 'creatingmicroservicewithspring009288',
                book_title: 'microservice using spring boot 2',
                amount: 1
            })

            db.addLibraryBook({
                _id:'introductorytypescript327673',
                book_id: 'introductorytypescript327673',
                book_title: 'intro to typescript',
                amount: 1
            })

        })

        it('Should return an empty library search result', async function(){
            const library = await db.readLibrary('intro to python');
            library.should.be.empty;
        })

        it('Should return 5 books in library', async function(){
            const library = await db.readLibrary()
            library.should.have.lengthOf(5);
        })

        it('Should return 3 books matching library searched books', async function(){
            const library = await db.readLibrary('intro to')
            library.should.have.lengthOf(3)
        })
    })

    describe('Borrow Book and readBorrowedBook() Test',function(){
        before(async ()=>{
            
            await db.addToBorrowedBook({
                _id: 'beginningtestwithjest120902_jessicaibeanusi@gmail.com',
                book_id: 'beginningtestwithjest120902',
                user_id: 'jessicaibeanusi@gmail.com',
                book_title: 'jest framework',
            })

            await db.addToBorrowedBook({
                _id: 'beginningtestwithjest120902_christopherachuzia@gmail.com',
                book_id: 'beginningtestwithjest120902',
                user_id: 'christopherachuzia@gmail.com',
                book_title: 'jest framework',
            })

            await db.addToBorrowedBook({
                _id: 'creatingmicroservicewithspring009288_christopherachuzia@gmail.com',
                book_id: 'creatingmicroservicewithspring009288',
                user_id: 'christopherachuzia@gmail.com',
                book_title: 'microservice using spring boot 2'
            })
        })

        it('Should return 2 user booklist after borrow', async function(){
            let booklist = await db.readBorrowedBook({userid: 'christopherachuzia@gmail.com'})
            booklist.should.have.lengthOf(2)
        })

        it('Should return 4 books in library after borrow', async function(){
            const library = await db.readLibrary()
            library.should.have.lengthOf(4);
        })

        it('Should return 2 booklist in report', async function(){
            let booklist = await db.readBorrowedBook({report: true})

            booklist.should.have.lengthOf(2)
        })
    })

    describe('Return book test',function(){
        before(async ()=>{
            
            await db.returnToAvailableBook({
                _id: 'beginningtestwithjest120902_jessicaibeanusi@gmail.com',
                book_id: 'beginningtestwithjest120902',
                user_id: 'jessicaibeanusi@gmail.com',
                book_title: 'jest framework'
            })

            await db.returnToAvailableBook({
                _id: 'creatingmicroservicewithspring009288_christopherachuzia@gmail.com',
                book_id: 'creatingmicroservicewithspring009288',
                user_id: 'christopherachuzia@gmail.com',
                book_title: 'microservice using spring boot 2'
            })

        })
        it('Should return 5 books in library after book returned', async function(){
            const library = await db.readLibrary()
            library.should.have.lengthOf(5);
        })

        it('Should return 1 book in user booklist after book returned', async function(){
            let booklist = await db.readBorrowedBook({userid: 'christopherachuzia@gmail.com'})
            booklist.should.have.lengthOf(1)
        })
    })

    describe('Delete book test', function(){
        before(async ()=>{
            await db.deleteLibraryBook('beginningtestwithjest120902')
            
        })

        it('Should have 0 Jest Framework books', async function(){
            const jest_framework_book = await db.findOneLibraryBook('beginningtestwithjest120902');
            
            expect(jest_framework_book).equal(null)
        })

        it('Should return 4 books in library', async function(){
            const available_books = await db.readLibrary();
            available_books.should.have.lengthOf(4)
        })

        it('Should return 5 books in library', async function(){
            
            await db.returnToAvailableBook({
                _id: 'beginningtestwithjest120902_christopherachuzia@gmail.com',
                book_id: 'beginningtestwithjest120902',
                user_id: 'christopherachuzia@gmail.com',
                book_title: 'jest framework'
            })
            const available_books = await db.readLibrary();
            
            available_books.should.have.lengthOf(5)
        })

        it('Should have 1 copy of Jest Framework books', async function(){
            const jest_framework_book = await db.findOneLibraryBook('beginningtestwithjest120902');
            
            assert.deepEqual(jest_framework_book,{
                _id:'beginningtestwithjest120902',
                book_id: 'beginningtestwithjest120902',
                book_title: 'jest framework',
                amount: 1
            })
        })

        it('Should have empty borrowed report', async function(){
            const report = await db.readBorrowedBook({report: true})
            report.should.be.empty
        })
    })
})