const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    create_date: {
        type: Date,
        default: new Date()
    }
});
module.exports = userSchema;
