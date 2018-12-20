const connectMongo = require("../dbhelper/connect");
var config = require("../config/index");
const connect = function() {
    return new Promise(async (resolve, reject) => {
        let myblog = await connectMongo({
            address: config.mongodb,
            database: "myblog"
        });
    }); //链接默认数据库
};

module.exports = connect;
