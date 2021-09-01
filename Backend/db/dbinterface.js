class DBInterface{
    async findOneUser(user){}
    async readBorrowedBook(filterbook = null){}
    async readLibrary(filterbook = null){}
    async saveOneUser(user){}
    async saveBook(book){}
    async deleteBook(book){}
    async returnBook(book){}
    async saveToBookList(book){}
    async updateStore(data){}
}