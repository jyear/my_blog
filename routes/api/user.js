const router = require("koa-router")();
const userModel = require("../../models/user/Model");
const vilidDataFun = require("../../utils/vilidata");
const user = new userModel();
router.post("/", async (ctx, next) => {
    let res = ctx.response;
    let query = ctx.query;
    let resBody = {};
    res.status = 200;
    let isVilid = false;
    try {
        vilidDataFun(
            {
                name: {
                    empty: true,
                    length: {
                        maxLength: 16
                    }
                },
                password: {
                    empty: true,
                    length: {
                        minLength: 6,
                        maxLength: 16
                    }
                },
                account: {
                    empty: true,
                    length: {
                        minLength: 6,
                        maxLength: 16
                    }
                }
            },
            query
        );
        isVilid = true;
    } catch (e) {
        if (e) {
            resBody.message = e.toString().replace("Error:", "");
            resBody.code = "403";
            res.body = resBody;
        }
        await next();
    }
    if (!isVilid) {
        return;
    }
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
        await next();
    }
});
module.exports = router;
