const Chai = require('chai');

const should = Chai.should();
const expect =  Chai.expect;

const mock_database = require('./mockdatabase');

const {getBookList, getLibraryContent} = require('../library')

describe('Library Module Test', function(){
    describe('#getBookList() Test', function(){
        it('Should return empty user booklist', async function(){
            mock_database.loadBorrowedList([])
            const booklist = await getBookList({userid: 'christopherachuzia@gmail.com'}, mock_database);
            expect(booklist).to.be.empty;
        })

        it('Should return user booklist', async function(){
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
            const booklist = await getBookList({userid: 'christopherachuzia@gmail.com'}, mock_database);
            expect(booklist).to.have.lengthOf(2);
        })

        it('Should return empty booklist report', async function(){
            mock_database.loadBorrowedList([])
            const booklist = await getBookList({report: true}, mock_database);
            expect(booklist).to.be.empty;
        })

        it('Should return all borrowed book report', async function(){
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
                },
                {
                    _id: 'endtoendmochatest1232387463_jessicaibeanusi@gmail.com',
                    user_id: 'jessicaibeanusi@gmail.com',
                    book_id: 'endtoendmochatest1232387463',
                    book_title: 'End To End Testing Using Mocha'
                },
                {
                    _id: 'rubyonrails12232_christopherachuzia@gmail.com',
                    user_id: 'christopherachuzia@gmail.com',
                    book_id: 'rubyonrails12232',
                    book_title: 'Intro to Rails 5'
                }
            ])
            const booklist = await getBookList({report: true}, mock_database);
            expect(booklist).to.have.lengthOf(3);
        })
    })

    describe('#getLibraryContent() Test', function(){
        it('Should return empty library', async function(){
            mock_database.loadAvailableBooks([])
            const librarycontent = await getLibraryContent(null,mock_database);
            expect(librarycontent).to.be.empty;
        })

        it('Should return all borrowed book report', async function(){
            mock_database.loadAvailableBooks([
                {
                    _id: 'endtoendmochatest1232387463',
                    book_id: 'endtoendmochatest1232387463',
                    book_title: 'End To End Testing Using Mocha',
                    amount: 2
                },
                {
                    _id: 'es6professional10090',
                    book_id: 'es6professional10090',
                    book_title: 'Modern Javascript with ES6',
                    amount: 1
                },
                {
                    _id: 'phpfrombeginnertopro22u33',
                    book_id: 'phpfrombeginnertopro22u33',
                    book_title: 'Professional PHP',
                    amount:4
                },
                {
                    _id: 'rubyonrails12232',
                    book_id: 'rubyonrails12232',
                    book_title: 'Intro to Rails 5',
                    amount: 1
                }
            ])
            const booklist = await getLibraryContent(null, mock_database);
            expect(booklist).to.have.lengthOf(4);
        })
    })
})