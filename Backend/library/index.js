module.exports.getBookList = async (userdata, db) =>{
    try{
        return await db.readBorrowedBook(userdata);
    }
    catch(err){
        console.log(err.message);
        return {
            error: true,
            message:'Internal error occoured'
        }
    }
}

module.exports.getLibraryContent = async (filter = null, db)=>{
    try{
        return await db.readLibrary(filter)
    }
    catch(err){
        console.log(err.message)
        return {
            error: true,
            message:'Internal error occoured'
        }
    }
}