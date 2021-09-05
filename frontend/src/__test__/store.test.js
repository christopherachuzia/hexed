import storeFactory from '../store'

import {
    loadLibraryContent,
    loginUser,
    createNewUser,
    getUserBooklist,
    getBorrowReport,
    borrowLibraryBook,
    returnLibraryBook,
    addToLibraryBook,
    deleteFromLibrary,
    showAddBook,
    showCreateAccount,
    showLogin
} from '../store/actioncreator'

import C from '../store/actiontype'



import initialstate from './initialstate_test_file'

import axios from 'axios'

jest.mock('axios')

describe('Store Tester',()=>{
    let store;
    beforeAll(()=>{
        store = storeFactory(initialstate);
    })

    afterAll(()=>{
        store = null;
    })


    it('Should create a store',()=>{
        expect(store).toBeDefined();
    })

    describe('#loadLibraryContent() Test',()=>{
        it('Should load content as library content', async()=>{
            const library = [
                {
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'Book One',
                    amount: 2
                },
                {
                    _id: 'book2id',
                    book_id: 'book2id',
                    book_title: 'Book Two',
                    amount: 1
                },
                {
                    _id: 'book3id',
                    book_id: 'book3id',
                    book_title: 'Book Three',
                    amount: 4
                }
            ]

            const res = {
                data: library
            }

            axios.get.mockResolvedValue(res);

            const action_promise = await store.dispatch(loadLibraryContent())
            
            store.dispatch({
                type: C.LOAD_LIBRARY,
                value: [...action_promise.data]
            })

            const librarybooks = store.getState().librarybook;
            expect(librarybooks.length).toBe(3)
            expect(librarybooks).toEqual(library)
        })
    })


    describe('#loginUser() Test',()=>{
        it('Should login user', async()=>{
            
            const res = {
                data: {
                    success: true,
                    name: 'Achuzia Christopher',
                    isadmin: true,
                    token: 'djdkcnksdksis.kid677876skds;ds'
                }
            }

            axios.post.mockResolvedValue(res);

            const userdata = await store.dispatch(loginUser({email:'christopherachuzia@gmail.com',password:'123456'}))
            
            store.dispatch({
                type: C.UPDATE_USER,
                value: {...userdata.data}
            })

            const user = store.getState().user;
            expect(user).toEqual({
                success: true,
                name: 'Achuzia Christopher',
                isadmin: true,
                token: 'djdkcnksdksis.kid677876skds;ds'
            })
        })

        it('Should clear login user state', async ()=>{
            store.dispatch({
                type: C.UPDATE_USER,
                value: {}
            })

            const user = store.getState().user
            expect(user.name).toBeUndefined()
        })
    })

    describe('#createNewUser() Test', function(){
        it('Should create and login new user', async ()=>{
            const res = {
                data: {
                    success: true,
                    name: 'Achuzia Christopher',
                    isadmin: true,
                    token: 'djdkcnksdksis.kid677876skds;ds'
                }
            }

            axios.post.mockResolvedValue(res);
            const userdata = await store.dispatch(createNewUser({email:'christopherachuzia@gmail.com',name:'Achuzia Christopher',password:'123456'}))

            store.dispatch({
                type: C.UPDATE_USER,
                value: {...userdata.data}
            })

            const user = store.getState().user;
            expect(user).toEqual({
                success: true,
                name: 'Achuzia Christopher',
                isadmin: true,
                token: 'djdkcnksdksis.kid677876skds;ds'
            })
        })
    })

    describe('#getUserBooklist() Test', function(){
        it('Should load user booklist with data', async ()=>{
            const booklistdata = [
                {
                    _id: 'book1id_user1',
                    book_id: 'book1id',
                    book_title: 'Book One',
                    user_id: 'user1'
                },
                {
                    _id: 'book2id_user1',
                    book_id: 'book2id',
                    book_title: 'Book Two',
                    user_id: 'user1'
                }
            ]

            const res = {
                data: booklistdata
            }

            axios.get.mockResolvedValue(res);

            const userbooklist = await store.dispatch(getUserBooklist())

            store.dispatch({
                type: C.LOAD_BOOKLIST,
                value: [...userbooklist.data]
            })

            const booklist = store.getState().booklist;
            expect(booklist.length).toBe(2)
            expect(booklist).toEqual(booklistdata)
        })
    })

    describe('#getBorrowReport() Test', function(){
        it('Should load borrowedreport with data', async ()=>{
            const borrowreportdata = [
                {
                    _id: 'Book one',
                    users: 3
                },
                {
                    _id: 'Book two',
                    users: 1
                },
                {
                    _id: 'Book three',
                    users: 5
                }
            ]

            const res = {
                data: borrowreportdata
            }

            axios.get.mockResolvedValue(res);

            const report = await store.dispatch(getBorrowReport())

            store.dispatch({
                type: C.LOAD_REPORT,
                value: [...report.data]
            })

            const borrowedreport = store.getState().borrowedreport;
            expect(borrowedreport.length).toBe(3)
            expect(borrowedreport).toEqual(borrowreportdata)
        })
    }) 
    
    describe('#borrowLibraryBook() Test', function(){
        beforeEach(()=>{
            store.dispatch({
                type: C.LOAD_BOOKLIST,
                value: []
            })

            store.dispatch({
                type: C.LOAD_LIBRARY,
                value: [
                    {
                        _id: 'book1id',
                        book_id: 'book1id',
                        book_title: 'Book One',
                        amount: 2
                    },
                    {
                        _id: 'book2id',
                        book_id: 'book2id',
                        book_title: 'Book Two',
                        amount: 1
                    },
                    {
                        _id: 'book3id',
                        book_id: 'book3id',
                        book_title: 'Book Three',
                        amount: 4
                    }
                ]
            })
        })

        it('Should borrow \'Book Two\', delete \'Book Two\' from library and add to booklist', async ()=>{
            const res = {
                data: {
                    _id: 'book2id_user1_id',
                    book_id: 'book2id',
                    user_id: 'user1_id',
                    book_title: 'Book Two'
                }
            }

            axios.post.mockResolvedValue(res);

            const book_borrowed = await store.dispatch(borrowLibraryBook('user1_id','book2id'))

            store.dispatch({
                type: C.DELETE_BOOK,
                value: {_id: book_borrowed.data.book_id}
            })

            store.dispatch({
                type: C.BORROW_BOOK,
                value: {
                    ...book_borrowed.data
                }
            })

            const {booklist, librarybook} = store.getState();
            expect(librarybook.some(book => book._id === book_borrowed.data.book_id)).toBeFalsy()
            expect(booklist.some(book => book._id === book_borrowed.data._id)).toBeTruthy()
        })
    })  
    
    describe('#returnLibraryBook() Test', function(){
        beforeEach(()=>{
            store.dispatch({
                type: C.LOAD_BOOKLIST,
                value: [
                    {
                        _id: 'book1id_user1',
                        book_id: 'book1id',
                        book_title: 'Book One',
                        user_id: 'user1'
                    },
                ]
            })

            store.dispatch({
                type: C.LOAD_LIBRARY,
                value: [
                    {
                        _id: 'book1id',
                        book_id: 'book1id',
                        book_title: 'Book One',
                        amount: 2
                    },
                ]
            })
        })

        it('Should return \'Book One\' to library', async ()=>{
            const res = {
                data: {
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'Book One',
                    amount: 3
                }
            }

            axios.post.mockResolvedValue(res);

            const returned_book = await store.dispatch(returnLibraryBook('user1_id','book1id'))

            store.dispatch({
                type: C.UPDATE_BOOK,
                value: {
                    ...returned_book.data
                }
            })

            store.dispatch({
                type: C.RETURN_BOOK,
                value: {
                    _id: 'book1id_user1'
                }
            })

            const {booklist, librarybook} = store.getState();
            expect(booklist.length).toBe(0)
            expect(librarybook[0].amount).toBe(3)
        })
    })

    describe('#addToLibraryBook() Test', function(){
        beforeEach(()=>{
            store.dispatch({
                type: C.LOAD_LIBRARY,
                value: []
            })
        })

        it('Should add \'Book One\' to library', async ()=>{
            const res = {
                data: {
                    _id: 'book1id',
                    book_id: 'book1id',
                    book_title: 'Book test',
                    amount: 2
                }
            }

            axios.post.mockResolvedValue(res);

            const added_book = await store.dispatch(addToLibraryBook('Book test',2))

            store.dispatch({
                type: C.ADD_BOOK,
                value: {
                    ...added_book.data
                }
            })


            const {librarybook} = store.getState();
            expect(librarybook.length).toBe(1)
            expect(librarybook[0]._id).toEqual('book1id')
        })
    })
    

    describe('#deleteFromLibrary() Test', function(){
        beforeEach(()=>{
            store.dispatch({
                type: C.LOAD_LIBRARY,
                value: []
            })
        })

        it('Should remove \'Book One\' from library', async ()=>{
            const res = {
                data: 'book1id'
            }

            axios.delete.mockResolvedValue(res);

            const remove_book = await store.dispatch(deleteFromLibrary('book1id'))

            store.dispatch({
                type: C.DELETE_BOOK,
                value: {
                    ...remove_book.data
                }
            })


            const {librarybook} = store.getState();
            expect(librarybook.length).toBe(0)
        })
    })

    describe('#showAddBook() Test', function(){
        
            it('Should return true',  ()=>{
            store.dispatch(showAddBook(true))


            const {addbook} = store.getState();
            expect(addbook).toBeTruthy()
        })
    })

    describe('#showCreateAccount() Test', function(){
        
        it('Should return true',  ()=>{
            store.dispatch(showCreateAccount(true))
            const {showcreateaccount} = store.getState();
            expect(showcreateaccount).toBeTruthy()
        })
    })

    describe('#showLogin() Test', function(){
        
        it('Should return true',  ()=>{
                store.dispatch(showLogin(true))


                const {startlogin} = store.getState();
                expect(startlogin).toBeTruthy()
            })
    })
    
    describe('#loadinglibrary() Test', function(){
        
        it('Should return false',  ()=>{
                store.dispatch({
                    type: C.START_LOADING,
                    value: false
                })


                const {loading} = store.getState();
                expect(loading).toBeFalsy()
            })
    })
})