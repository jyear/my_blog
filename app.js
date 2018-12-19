const Koa = require("koa2");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const corsEvent = require("./utils/cors");
const koaStaticPlus = require("koa-static-plus");
const errorEvent = require("./utils/error");
const routes = require("./utils/setrouter");

const app = new Koa();
//跨域处理
app.use(corsEvent);
//路由
app.use(routes.routes());
app.use(routes.allowedMethods());
//静态资源处理
app.use(
    koaStaticPlus(path.join(__dirname, "./assets"), {
        pathPrefix: "/assets", //路径前缀
        maxage: 300000
    })
);
//错误status处理
app.use(errorEvent);
//参数处理
app.use(bodyParser());

let env = process.env.NODE_ENV;
if (env === "production") {
    app.listen(8001, "0.0.0.0");
} else {
    app.listen(8002, "0.0.0.0");
}
