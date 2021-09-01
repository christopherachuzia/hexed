module.exports = async function (engine){
    try {
        let DatabaseEngine = await require(`./db_engines/${engine}`);
        return new DatabaseEngine();
    } catch (err) {
        console.log(err)
        throw new Error(`Sorry database engine '${engine}' does not exist`);
    }
}
