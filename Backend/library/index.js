module.exports.getBookList = async (userdata,db) =>{
    try{
        return await db.readBorrowedBook(userdata);
    }
    catch(err){
        console.log(err.message);
        return {
            error: true,
            message:err.message
        }
    }
}

module.exports.getLibraryContent = async (db,filter = null)=>{
    try{
        return await db.readLibrary(filter)
    }
    catch(err){
        console.log('err',err.message)
        return {
            error: true,
            message: err.message
        }
    }
}