const {bookLimitReached, containsBook} = require('./utils')

module.exports.borrowBook = async (borrowdata, db)=>{
    try{
        const user_book_list = await db.readBorrowedBook(borrowdata);
        if(bookLimitReached(user_book_list)){
            return {
                error: true,
                message: 'Borrow limit reached'
            }
        }
        
        if(containsBook(user_book_list,borrowdata.bookid)){
            return {
                error: true,
                message: 'Book is already in your booklist'
            }
        }

        const book = await db.findOneBook(borrowdata.bookid);
        if(!book){
            return {
                error: true,
                message: 'Book not available'
            }
        }

        return await db.updateStores({
            action: 'borrow',
            data:{
                book: {...book},
                _id: `${book.book_id}_${borrowdata.userid}`,
                book_id: book.book_id, 
                user_id: borrowdata.userid
            }
        })
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: 'Internal error occoured'
        }
    }
}

module.exports.returnBook = async (returndata, db) =>{
    try{
        const user_book_list = await db.readBorrowedBook(returndata);
        
        if(!containsBook(user_book_list,returndata.bookid)){
            return {
                error: true,
                message: 'Book not in you booklist and can not be removed'
            }
        }

        const book = await db.findOneBorrowedBook(`${returndata.bookid}_${returndata.userid}`);

        if(!book){
            return {
                error: true,
                message: 'Book not in booklist'
            }
        }

        const return_book = {
            _id:book.book_id,
            book_id:book.book_id,
            book_title: book.book_title
        }
        return await db.updateStores({
            action: 'return',
            data:{
                book: {...return_book},
                _id: `${book.book_id}_${returndata.userid}`,
                book_id: book.book_id, 
                user_id: returndata.userid, 
            }
        })
        
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: 'Internal error occoured'
        }
    }
}

module.exports.addBook = async (bookdata, db)=>{
    try{
        return await db.updateStores({
            action: 'add',
            data:{
                book:{...bookdata}
            }
        })
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: 'Error adding book'
        }
    }
}

module.exports.removeBook = async (bookdata, db)=>{
    try{
        return await db.updateStores({
           action: 'delete', 
           data:{
               book:{...bookdata}
           }
        })
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: 'Error deleting book'
        }
    }
}