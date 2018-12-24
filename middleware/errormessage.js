const log4js = require("../log/config");
const logger = log4js.getLogger("error");
const errorHandler = function(err, ctx) {
    let env = process.env.NODE_ENV;
    if (env != "production") {
        console.log(err);
    }
    logger.error(err);
};

module.exports = errorHandler;
