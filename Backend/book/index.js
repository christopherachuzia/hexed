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

        const book = await db.readLibrary(borrowdata);
        if(!book){
            return {
                error: true,
                message: 'Book not available'
            }
        }

        return await db.updateStores({...book, _id: `${book.book_id}_${borrowdata.userid}`, user_id: borrowdata.userid})
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

        const book = await db.readLibrary(returndata);

        return await db.updateStores({
            ...book,
            _id: `${book.book_id}_${returndata.userid}`,
            user_id: returndata.userid, 
            return: returndata.return
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
        return await db.saveBook(bookdata)
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
        return await db.deleteBook(bookdata)
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: 'Error deleting book'
        }
    }
}