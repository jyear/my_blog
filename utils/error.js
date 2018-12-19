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
                msg: "路由不存在",
                content: ctx.request
            };
            await next();
        }
    } else if (ctx.status >= 500) {
        res.body = { status: ctx.status };
        await next();
    }
};
module.exports = errorEvent;
