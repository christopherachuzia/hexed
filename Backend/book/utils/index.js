module.exports.bookLimitReached = (booklist, limit = 2)=>{
    return booklist.length >= limit ? true : false;
}

module.exports.containsBook = (booklist, bookid)=>{
    return booklist.some(book => book.book_id === bookid)
}
