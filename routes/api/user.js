const router = require("koa-router")();
const userModel = require("../../models/user/Model");
const user = new userModel();
router.post("/", async (ctx, next) => {
    let res = ctx.response;
    let query = ctx.query;
    let resBody = {};

    if (query.account && query.name && query.password) {
        let save = await user.save({
            account: query.account,
            name: query.name,
            password: query.password
        });
        if (save.state == "success") {
            resBody = {
                code: 200,
                data: save.data
            };
        } else {
            resBody = {
                code: 300,
                message: save.message
            };
        }
    } else {
        let keys = Obejct.keys(query);
        if (keys.indexof("account") == -1) {
            resBody.message = "账号不能为空";
        }
        if (keys.indexof("name") == -1) {
            resBody.message = "名称不能为空";
        }
        if (keys.indexof("password") == -1) {
            resBody.message = "密码不能为空";
        }
        resBody.code = "403";
    }

    res.status = 200;
    res.body = resBody;
    await next();
});
module.exports = router;
