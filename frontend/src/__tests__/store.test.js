import storeFactory from '../../store'

import {
    loadLibraryContent,
    searchBook,
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

            axios.get.mockResolveValue(res);

            const action_promise = await store.dispatch(loadLibraryContent())
            
        })
    })
})