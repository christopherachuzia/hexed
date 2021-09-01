class DBInterface{
    async findOneUser(user){}
    async saveOneUser(user){}
    async readBorrowedBook(filterbook = null){}
    async readLibrary(filterbook = null){}
    async saveBook(book){}
    async deleteBook(book){}
    async returnBook(book){}
    async saveToBookList(book){}
    async updateStore(data){}
}

module.exports = DBInterface