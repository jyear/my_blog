const log4js = require("../log/config");
const logger = log4js.getLogger("error");
const errorHandler = function(err, ctx) {
    logger.error(err);
};

module.exports = errorHandler;
