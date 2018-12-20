var mongoose = require("mongoose");
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
            reject(e);
        });
    });
}
module.exports = connectMongo;
