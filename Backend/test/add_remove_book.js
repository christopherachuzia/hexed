const Chai = require('chai');

const should = Chai.should();
const expect = Chai.expect;
const assert = Chai.assert;

const mock_database = require('./mockdatabase')

const { addBook, deleteBook} = require('../book');


describe('Add and Remove Available book Test',function(){
    
    describe('#addBook() Test', function(){
        before(()=>{
            mock_database.loadBorrowedList([])
        })

        it('Should add 1 book to available books', async function(){
            const book = {
                title: 'Mysql for beginners',
                amount: 3
            }
            const added_book_response = await addBook(book, mock_database);
            assert.deepEqual(added_book_response,{
                _id:'mysqlforbeginners',
                book_id: 'mysqlforbeginners',
                book_title: 'mysql for beginners',
                amount: 3
            });
            
            mock_database.book_available.should.have.lengthOf(1)
        })

        it('Should increment amount by 2', async function(){
            const book = {
                title: 'Mysql for beginners',
                amount: 2
            }
            const added_book_response = await addBook(book, mock_database);
            assert.deepEqual(added_book_response,{
                _id:'mysqlforbeginners',
                book_id: 'mysqlforbeginners',
                book_title: 'mysql for beginners',
                amount: 5
            });
            
            mock_database.book_available.should.have.lengthOf(1)
        })

        it('Should add another book', async function(){
            const book = {
                title: 'principle of ux design',
                amount: 1
            }
            const added_book_response = await addBook(book, mock_database);
            assert.deepEqual(added_book_response,{
                _id:'principleofuxdesign',
                book_id: 'principleofuxdesign',
                book_title: 'principle of ux design',
                amount: 1
            });
            
            mock_database.book_available.should.have.lengthOf(2)
        })
    })

    describe('#deleteBook() Test',function(){
        it('Should return true and remove book', async function(){
            const book = 'principleofuxdesign'
            const delete_book_response = await deleteBook(book, mock_database);
            delete_book_response.should.be.true
            
            
            mock_database.book_available.should.have.lengthOf(1)
            expect(mock_database.book_available[0]._id).equal('mysqlforbeginners')
        })

        it('Should return false if book doesnt exist', async function(){
            const book = 'hijdshdjfnsdjfsdf'
            const delete_book_response = await deleteBook(book, mock_database);
            delete_book_response.should.be.false
            
            
            mock_database.book_available.should.have.lengthOf(1)
            expect(mock_database.book_available[0]._id).equal('mysqlforbeginners')
        })
    })

    describe('#deleteBook() Test',function(){
        
    })
})
