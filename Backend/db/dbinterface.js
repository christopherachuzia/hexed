class DBInterface{
    async findOneUser(user){}
    async saveOneUser(user){}
    async readBorrowedBook(filterbook = null){}
    async readLibrary(filterbook = null){}
    async findOneLibraryBook(book) {}
    async findOneBorrowedBook(book){}
    async addToBorrowedBook(data){}
    async addLibraryBook(data){}
    async deleteLibraryBook(id){}
    async returnToAvailableBook(data){}
}

module.exports = DBInterface