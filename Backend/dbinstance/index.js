class DBInstance {
    constructor(){
        this.db = null
    }

    setDBinstance(db){
        this.db = db
    }

    getInstance(){
        return this.db
    }
}

module.exports = new DBInstance()