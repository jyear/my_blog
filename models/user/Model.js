const Schema = require("./Schema");
const mongoose = require("mongoose");
const dbHelper = require("../../dbhelper/connect");
let UserModel = mongoose.model("user", Schema);

function user() {
    let db = dbHelper();
}
user.prototype = {
    save: async function(data) {
        return new Promise(async (resolve, reject) => {
            var newUser = new UserModel({
                ...data
            });
            try {
                let save = await newUser.save();
                resolve({
                    state: "success",
                    data: save
                });
            } catch (e) {
                reject({
                    state: "error",
                    message: e.errmsg
                });
            }
        });
    },
    findByAccount: async function(data) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.find({ account: data }).exec(function(err, res) {
                    resolve({
                        state: "success",
                        data: res
                    });
                });
            } catch (e) {
                reject({
                    state: "error",
                    message: e
                });
            }
        });
    }
};
module.exports = user;
