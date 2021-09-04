import {
    startlogin,
    showcreateaccount, 
    book,
    librarybook, 
    myborrowedbook,
    booklist, 
    searchbook, 
    borrowedreport, 
    user,
    addbook,
    startdelete,
    returnbook,
    borrowbook,
    startcreateaccount
} from '../store/reducer'

import C from '../store/actiontype';

describe('Testing Reducers', function(){
    describe('#startlogin() Test',function(){
        it('Should return true',()=>{
            const action = {
                type: C.SHOW_LOGIN,
                value: true
            }

            expect(startlogin(false,action)).toBeTruthy()
        })

        it('Should return false',()=>{
            const action = {
                type: C.SHOW_LOGIN,
                value: false
            }

            expect(startlogin(true,action)).toBeFalsy()
        })
    })

    describe('#showcreateaccount() Test',function(){
        it('Should return true',()=>{
            const action = {
                type: C.SHOW_CREATE_ACCOUNT,
                value: true
            }

            expect(showcreateaccount(false,action)).toBeTruthy()
        })

        it('Should return false',()=>{
            const action = {
                type: C.SHOW_CREATE_ACCOUNT,
                value: false
            }

            expect(showcreateaccount(true,action)).toBeFalsy()
        })
    })

    describe('#startcreateaccount() Test', function(){
        it('Should return true',()=>{
            const action = {
                type: C.CREATE_ACCOUNT,
                value: true
            }

            expect(startcreateaccount(false,action)).toBeTruthy()
        })

        it('Should return false',()=>{
            const action = {
                type: C.CREATE_ACCOUNT,
                value: false
            }

            expect(startcreateaccount(true,action)).toBeFalsy()
        })
    })

    describe('#book() Test',function(){
        let bookdata
        beforeAll(()=>{
            bookdata={}
        })

        it('Should create book',()=>{
            const action = {
                type: C.ADD_BOOK,
                value:{
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'Book One'
                }
            }

            bookdata = book(bookdata, action)
            expect(bookdata).toEqual({
                _id: 'book1id',
                book_id: 'book1id',
                book_title: 'Book One'
            }) 
        })

        it('Should update book',()=>{
            const action = {
                type: C.UPDATE_BOOK,
                value:{
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'Book two'
                }
            }

            bookdata = book(bookdata, action)
            expect(bookdata).toEqual({
                _id: 'book1id',
                book_id: 'book1id',
                book_title: 'Book two'
            }) 
        })
    })

    describe('#librarybook() Test',function(){
        let library;
        beforeAll(()=>{
            library = []
        })

        it('Should contain 1 book',()=>{
            const action = {
                type: C.ADD_BOOK,
                value: {
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'first book',
                    amount: 3
                }
            }

            library = librarybook(library,action);
            expect(library.length).toBe(1)
        })

        it('Should contain 2 book',()=>{
            const action = {
                type: C.ADD_BOOK,
                value: {
                    _id: 'book2id',
                    book_id: 'book2id',
                    book_title: 'second book',
                    amount: 1
                }
            }

            library = librarybook(library,action);
            expect(library.length).toBe(2)
        })

        it('Should contain 3 book',()=>{
            const action = {
                type: C.ADD_BOOK,
                value: {
                    _id: 'book3id',
                    book_id: 'book3id',
                    book_title: 'third book',
                    amount: 2
                }
            }

            library = librarybook(library, action);
            expect(library.length).toBe(3)
        })

        it('Should remove one book and contain 2 book',()=>{
            const action = {
                type: C.DELETE_BOOK,
                value: {
                    _id: 'book2id',
                }
            }

            library = librarybook(library,action);
            expect(library.length).toBe(2)
            expect(library.some(book=>book._id === 'book2id')).toBeFalsy()
        })

        it('Should update book1id',()=>{
            const action = {
                type: C.UPDATE_BOOK,
                value: {
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'first book',
                    amount: 5
                }
            }

            library = librarybook(library,action);
            const updated_book = library.find(book => book._id === 'book1id')
            expect(updated_book.amount).toBe(5)
        })

        it('Should refresh library to empty',()=>{
            const action = {
                type: C.LOAD_LIBRARY,
                value: []
            }

            library = librarybook(library,action);
            expect(library.length).toBe(0)
        })
    })

    describe('#myborrowedbook() Test',function(){
        it('Should create borrowed book',()=>{
            const action = {
                type: C.BORROW_BOOK,
                value:{
                    _id: 'book1id_user1',
                    book_id: 'book1id',
                    book_title: 'Book One',
                    user_id: 'user1'
                }
            }

            const borroweddata = myborrowedbook({}, action)
            expect(borroweddata).toEqual({
                _id: 'book1id_user1',
                book_id: 'book1id',
                book_title: 'Book One',
                user_id: 'user1'
            }) 
        })
    })

    describe('#booklist() Test',function(){
        let mybooklist;
        beforeAll(()=>{
            mybooklist = []
        })

        it('Should contain 1 book',()=>{
            const action = {
                type: C.BORROW_BOOK,
                value: {
                    _id: 'book1id_user1',
                    book_id: 'book1id',
                    book_title: 'first book',
                    user_id: 'user1'
                }
            }

            mybooklist = booklist(mybooklist,action);
            expect(mybooklist.length).toBe(1)
        })

        it('Should contain 2 book',()=>{
            const action = {
                type: C.BORROW_BOOK,
                value: {
                    _id: 'book2id_user1',
                    book_id: 'book2id',
                    book_title: 'second book',
                    user_id: 'user1'
                }
            }

            mybooklist = booklist(mybooklist,action);
            expect(mybooklist.length).toBe(2)
        })

        it('Should remove a specific book from booklist',()=>{
            const action = {
                type: C.RETURN_BOOK,
                value: {
                    _id: 'book1id_user1',
                }
            }

            mybooklist = booklist(mybooklist,action);
            expect(mybooklist[0]._id).toMatch('book2id_user1')
        })


        it('Should refresh booklist to empty',()=>{
            const action = {
                type: C.LOAD_BOOKLIST,
                value: []
            }

            mybooklist = booklist(mybooklist,action);
            expect(mybooklist.length).toBe(0)
        })
    })
    

    describe('#searchbook() Test',function(){
        
        it('Should set search title',()=>{
            const action = {
                type: C.SEARCH_BOOK,
                value: 'mybooksearch'
            }

            expect(searchbook('',action)).toEqual('mybooksearch')
        })

        it('Should clear search title',()=>{
            const action = {
                type: C.CLEAR_SEARCH,
            }

            expect(searchbook('mybooklist',action)).toEqual('')
        })
    })


    describe('#borrowedreport() Test', function(){
        it('Should load borrowed report',()=>{
            const action = {
                type: C.LOAD_REPORT,
                value: [
                    {
                        _id: 'Book Title1',
                        user: 3
                    },
                    {
                        _id: 'Book Title2',
                        user: 1
                    },
    
                    {
                        _id: 'Book Title3',
                        user: 2
                    }
                ]
            }
            
            const report = borrowedreport([], action)
            expect(report.length).toBe(3)
        })
    })


    describe('#user() Test', function(){
        let userobject;
        beforeAll(()=>{
            userobject = {}
        })

        it('Should set user after successful login',()=>{
            const action = {
                type: C.UPDATE_USER,
                value: {
                    _id:'myemail@email.com',
                    email: 'myemail@email.com',
                    name:'My fullname',
                    isadmin: true
                }
            }
            
            userobject = user(userobject, action)
            expect(userobject.email).toEqual('myemail@email.com')
        })

        it('Should clear user after successful logout',()=>{
            const action = {
                type: C.UPDATE_USER,
                value: {}
            }
            
            userobject = user(userobject, action)
            expect(userobject.email).toBeUndefined()
        })
    })

    describe('#addbook() Test', function(){
        it('Should return false',()=>{
            const action = {
                type: C.SHOW_ADD,
                value: false
            }

            expect(addbook(true,action)).toBeFalsy()
        })

        it('Should return true',()=>{
            const action = {
                type: C.SHOW_ADD,
                value: true
            }

            expect(addbook(false,action)).toBeTruthy()
        })
    })

    describe('#startdelete() Test', function(){
        it('Should return false',()=>{
            const action = {
                type: C.START_DELETE,
                value: false
            }

            expect(startdelete(true,action)).toBeFalsy()
        })

        it('Should return true',()=>{
            const action = {
                type: C.START_DELETE,
                value: true
            }

            expect(startdelete(false,action)).toBeTruthy()
        })
    })

    describe('#returnbook() Test', function(){
        it('Should return false',()=>{
            const action = {
                type: C.START_RETURN,
                value: false
            }

            expect(returnbook(true,action)).toBeFalsy()
        })

        it('Should return true',()=>{
            const action = {
                type: C.START_RETURN,
                value: true
            }

            expect(returnbook(false,action)).toBeTruthy()
        })
    })

    describe('#borrowbook() Test', function(){
        it('Should return false',()=>{
            const action = {
                type: C.START_BORROW_BOOK,
                value: false
            }

            expect(borrowbook(true,action)).toBeFalsy()
        })

        it('Should return true',()=>{
            const action = {
                type: C.START_BORROW_BOOK,
                value: true
            }

            expect(borrowbook(false,action)).toBeTruthy()
        })
    })
    
    
})


