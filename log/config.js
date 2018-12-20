const log4js = require("log4js");
const path = require("path");
log4js.configure({
    appenders: {
        error: {
            type: "file",
            filename: path.join(__dirname, "./logs/error.log"),
            maxLogSize: 102400
        },
        debug: {
            type: "file",
            filename: path.join(__dirname, "./logs/debug.log"),
            maxLogSize: 102400
        }
    },
    categories: {
        default: { appenders: ["error"], level: "error" },
        debug: { appenders: ["debug"], level: "debug" }
    }
});
module.exports = log4js;
