var mongoose = require("mongoose");
const log4js = require("../log/config");
const logger = log4js.getLogger("database");
function connectMongo({ address, database }) {
    var dblink = `mongodb://${address}/${database}`;
    mongoose.connect(
        dblink,
        {
            config: { autoIndex: false },
            useNewUrlParser: true
        }
    );
    var db = mongoose.connection;
    return new Promise((resolve, reject) => {
        db.on("open", function() {
            resolve(db);
        });
        db.on("error", function(e) {
            console.log("数据库链接错误");
            logger.log(e);
            reject(e);
        });
    });
}
module.exports = connectMongo;
