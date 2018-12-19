const router = require("koa-router")();
router.get("/", async (ctx, next) => {
    const res = ctx.res;
    res.send({
        name: 11
    });
    await next();
});
module.exports = router;
