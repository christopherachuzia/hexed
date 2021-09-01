const Chai = require('chai');

const should = Chai.should();
const {bookLimitReached, containsBook} = require('../book/utils')

let user_book_list;

describe('Book Utils Test', function(){
    describe('#bookLimitReached() Test', function(){
        before(()=>{
            user_book_list = [
                {
                    _id:'123872637323dcjbdjud82372',
                    book_id: 'introtojava2021-28-38-09483',
                    book_title: 'Intro to java'
                }
            ]
        })
        
        afterEach(()=>{
            user_book_list = [
                {
                    _id:'123872637323dcjbdjud82372',
                    book_id: 'introtojava2021-28-38-09483',
                    book_title: 'Intro to java'
                }
            ]
        })
        it('Should return false if booklimit not reached', function(){
            bookLimitReached(user_book_list).should.be.false;
        })
    
        it('Should return true if book limit reached', function(){
            user_book_list = [
                {
                    _id:'123872637323dcjbdjud82372',
                    book_id: 'introtojava2021-28-38-09483',
                    book_title: 'Intro to java'
                },
                {
                    _id:'398923nc9dib9w',
                    book_id: 'phpforbeginners2020-39-3938',
                    book_title: 'Beginning PHP 7'
                }
            ]
            bookLimitReached(user_book_list).should.be.true;
        })
    })

    describe('#containsBook() Test', function(){
        before(()=>{
            user_book_list = [
                {
                    _id:'123872637323dcjbdjud82372',
                    book_id: 'introtojava2021-28-38-09483',
                    book_title: 'Intro to java'
                },
                {
                    _id:'12345',
                    book_id: 'pythonforbeginners12345',
                    book_title: 'Python for Beginners'
                }
            ]
        })

        it("Should return true if book is already in user booklist", function(){
            containsBook(user_book_list,'pythonforbeginners12345').should.be.true;
        })

        it("Should return false if book is not in user booklist", function(){
            containsBook(user_book_list,'phpforbeginners2020-39-3938').should.be.false;
        })
    })
})