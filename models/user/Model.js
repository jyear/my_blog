const Schema = require("./Schema");
const mongoose = require("mongoose");
const dbHelper = require("../../dbhelper/connect");
let UserModel = mongoose.model("user", Schema);

function user() {
    let db = dbHelper();
}
user.prototype = {
    save: async function(data) {
        var newUser = new UserModel({
            ...data
        });
        try {
            let save = await newUser.save();
            return {
                state: "success",
                data: save
            };
        } catch (e) {
            return {
                state: "error",
                message: e.errmsg
            };
        }
    }
};
module.exports = user;
