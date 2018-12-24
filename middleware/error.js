const errorEvent = async (ctx, next) => {
    let res = ctx.response;
    if (ctx.status == 404) {
        if (
            ctx.request.header["content-type"] &&
            ctx.request.header["content-type"].indexOf("json") == 1
        ) {
        } else {
            res.body = {
                status: ctx.status,
                message: "路由不存在" + ctx.request,
                code: 404
            };
            await next();
        }
    } else if (ctx.status >= 500) {
        res.body = { status: ctx.status, message: "服务器错误" };
        await next();
    }
};
module.exports = errorEvent;
