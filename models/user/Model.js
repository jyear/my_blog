const Schema = require("./Schema");
const mongoose = require("mongoose");
const dbHelper = require("../../dbhelper/connect");
let UserModel = mongoose.model("user", Schema);
let db = dbHelper();
function user() {}
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
                    if (!err) {
                        resolve({
                            state: "success",
                            data: res
                        });
                    } else {
                        reject({
                            state: "error",
                            message: err
                        });
                    }
                });
            } catch (e) {
                reject({
                    state: "error",
                    message: e
                });
            }
        });
    },
    find: async function() {
        return new Promise((resolve, reject) => {
            try {
                UserModel.find({}).exec(function(err, res) {
                    if (!err) {
                        resolve({
                            state: "success",
                            data: res
                        });
                    } else {
                        reject({
                            state: "error",
                            message: err
                        });
                    }
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
