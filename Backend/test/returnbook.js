const Chai = require('chai');

const should = Chai.should();
const expect = Chai.expect;
const assert = Chai.assert;

const mock_database = require('./mockdatabase')

const {borrowBook, returnBook} = require('../book');


describe('Return Books Module',function(){
    
    describe('#returnBook() Test', function(){
        before(()=>{
            mock_database.loadBorrowedList([
                {
                    _id: 'endtoendmochatest1232387463_christopherachuzia@gmail.com',
                    user_id: 'christopherachuzia@gmail.com',
                    book_id: 'endtoendmochatest1232387463',
                    book_title: 'End To End Testing Using Mocha'
                },
                {
                    _id: 'es6professional10090_christopherachuzia@gmail.com',
                    user_id: 'christopherachuzia@gmail.com',
                    book_id: 'es6professional10090',
                    book_title: 'Modern Javascript with ES6'
                }
            ])
        })
        it("Should fail if book is not in user booklist", async function(){
            
            bookdata = {
                        bookid:'rubyonrails177872', 
                        userid:'christopherachuzia@gmail.com',
                        present: true,
                        return: true
                    }
            const user_add_book_response = await returnBook(bookdata, mock_database);
            expect(user_add_book_response).to.be.an('object')
            assert.deepEqual(user_add_book_response,{
                error: true,
                message: 'Book not in you booklist and can not be removed'
            });
        })

        it("Should remove book from user booklist", async function(){
            
            bookdata = {
                        bookid:'es6professional10090',
                        userid:'christopherachuzia@gmail.com',
                        present: true,
                        return: true
                    }
            const user_add_book_response = await returnBook(bookdata, mock_database);
            expect(user_add_book_response).to.be.an('array')
            user_add_book_response.should.have.lengthOf(1);
            expect(user_add_book_response[0]._id).to.equal('endtoendmochatest1232387463_christopherachuzia@gmail.com')
        })
    })
})
