const Chai = require('chai');

const should = Chai.should();
const expect = Chai.expect;
const assert = Chai.assert;

const mock_database = require('./mockdatabase')
const {borrowBook} = require('../book');


describe('Borrow Books Module',function(){
    describe('#borrowBook() Test', function(){
        let bookdata;
        afterEach(()=>{
            bookdata = null;
        })

        it("Should fail if book is not available", async function(){
            
            bookdata = {
                        bookid:'scrummaster2.0-2332234', 
                        userid:'christopherachuzia@gmail.com',
                        present: false
                    }
            const user_add_book_response = await borrowBook(bookdata, mock_database);
            
            expect(user_add_book_response).to.be.an('object')
            assert.deepEqual(user_add_book_response,{
                error: true,
                message: 'Book not available'
            });
        })

        it("Should add book to user booklist", async function(){
            
            bookdata = {
                        bookid:'endtoendmochatest1232387463', 
                        userid:'christopherachuzia@gmail.com',
                        present: true
                    }
            
            const user_add_book_response = await borrowBook(bookdata, mock_database);
            assert.deepEqual(user_add_book_response,{
                _id: 'endtoendmochatest1232387463_christopherachuzia@gmail.com',
                book_id: 'endtoendmochatest1232387463',
                user_id: 'christopherachuzia@gmail.com',
                book_title: 'test book'
            })
        })

        it("Should fail and detect duplicate borrow", async function(){
            
            bookdata = {
                        bookid:'endtoendmochatest1232387463', 
                        userid:'christopherachuzia@gmail.com',
                        present: true
                    }
            const user_add_book_response = await borrowBook(bookdata, mock_database);
            expect(user_add_book_response).to.be.an('object')
            assert.deepEqual(user_add_book_response,{
                error: true,
                message: 'Book is already in your booklist'
            });
        })

        it("Should add new book to user booklist", async function(){
            
            bookdata = {
                        bookid:'es6professional10090',
                        userid:'christopherachuzia@gmail.com',
                        present: true
                    }
            const user_add_book_response = await borrowBook(bookdata, mock_database);
            assert.deepEqual(user_add_book_response,{
                _id: 'es6professional10090_christopherachuzia@gmail.com',
                book_id: 'es6professional10090',
                user_id: 'christopherachuzia@gmail.com',
                book_title: 'test book'
            })
            
        })

        it("Should fail and detect borrow limit", async function(){
            
            bookdata = {
                        bookid:'rubyonrails177872', 
                        userid:'christopherachuzia@gmail.com',
                        present: true
                    }
            const user_add_book_response = await borrowBook(bookdata, mock_database);
            expect(user_add_book_response).to.be.an('object')
            assert.deepEqual(user_add_book_response,{
                error: true,
                message: 'Borrow limit reached'
            });
        })
    })
})
