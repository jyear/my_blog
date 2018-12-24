const message = require("../config/messagecode");
module.exports = async function(ctx, next) {
    await next();
    ctx.response.status = 200;
    let res = ctx.response;
    let data = { code: 200, data: null, message: null, ...res.body };
    data.message = message[res.body.code]
        ? message[res.body.code].replace("${1}", res.body.message)
        : res.body.message;
    ctx.response.body = data;
};
