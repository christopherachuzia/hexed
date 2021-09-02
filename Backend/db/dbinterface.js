class DBInterface{
    async findOneUser(user){}
    async saveOneUser(user){}
    async readBorrowedBook(filterbook = null){}
    async readLibrary(filterbook = null){}
    async findOneBook(book) {}
    async findOneBorrowedBook(book){}
    async updateStore(data){}
}

module.exports = DBInterface