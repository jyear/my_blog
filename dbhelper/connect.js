var mongoose = require("mongoose");
var config = require("../config/index");
function connectMongo(collection) {
    var dblink = `mongodb://${config.mongodb}/${
        collection ? collection : "myblog"
    }`;
    mongoose.connect(
        dblink,
        { config: { autoIndex: false } }
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
