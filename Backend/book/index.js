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

        const book = await db.findOneLibraryBook(borrowdata.bookid);
        if(!book){
            return {
                error: true,
                message: 'Book not available'
            }
        }


        return await db.addToBorrowedBook({
            _id: `${book.book_id}_${borrowdata.userid}`,
            book_id: book.book_id, 
            user_id: borrowdata.userid,
            book_title: book.book_title,
        })
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: err.message
        }
    }
}

module.exports.returnBook = async (returndata, db) =>{
    try{
        const user_book_list = await db.readBorrowedBook(returndata);
        
        if(!containsBook(user_book_list,returndata.bookid)){
            return {
                error: true,
                message: 'Book not in your booklist and can not be returned'
            }
        }

        const book = await db.findOneBorrowedBook(`${returndata.bookid}_${returndata.userid}`);

        if(!book){
            return {
                error: true,
                message: 'Book not in booklist'
            }
        }

        return await db.returnToAvailableBook({
                _id: `${book.book_id}_${returndata.userid}`,
                book_id: book.book_id, 
                book_title: book.book_title,
                user_id: returndata.userid, 
        })
        
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: err.message
        }
    }
}

module.exports.addBook = async (bookdata, db)=>{
    try{
        const bookname = bookdata.title.toLowerCase()
        const data = {
            _id: bookname.replace(/\s/g,''),
            book_id: bookname.replace(/\s/g,''),
            book_title: bookname,
            amount: Number(bookdata.amount)
        }
        return await db.addLibraryBook(data)
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: err.message+', Error adding book'
        }
    }
}

module.exports.deleteBook = async (bookid, db)=>{
    try{
        return await db.deleteLibraryBook(bookid)
    }
    catch(err){
        console.log(err.message)
        return {
            error:true,
            message: err.message+', Error deleting book'
        }
    }
}