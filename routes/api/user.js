const router = require("koa-router")();
const userModel = require("../../models/user/Model");
const user = new userModel();
router.post("/", async (ctx, next) => {
    await next();
    let res = ctx.response;
    let query = ctx.query;
    let resBody = {};
    let keys = Object.keys(query);
    res.status = 200;
    if (keys.indexOf("name") == -1 || query.name.length <= 0) {
        resBody.message = "名称不能为空";
        resBody.code = "403";
        res.body = resBody;
    }
    if (keys.indexOf("password") == -1 || query.password.length <= 0) {
        resBody.message = "密码不能为空";
        resBody.code = "403";
        res.body = resBody;
    }
    if (keys.indexOf("account") == -1 || query.account.length <= 0) {
        resBody.message = "账号不能为空";
        resBody.code = "403";
        res.body = resBody;
    }
    if (query.account) {
        let m = await user.findByAccount(query.account);
        if (m && m.data && m.data.length > 0) {
            resBody.message = "账号已经存在";
            resBody.code = 301;
            res.body = resBody;
        } else {
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
            }
            res.body = resBody;
        }
    }
});
module.exports = router;
