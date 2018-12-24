const Koa = require("koa");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const corsEvent = require("./utils/cors");
const koaStaticPlus = require("koa-static-plus");
const errorEvent = require("./middleware/error");
const errorHandler = require("./middleware/errormessage");
const routes = require("./utils/setrouter");
const response = require("./middleware/handlerresponse");
//初始化数据库
const initMongo = require("./models/mongoinit");
initMongo().then(res => {
    console.log("链接数据库成功");
});
const app = new Koa();
app.use(response);

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
app.on("error", errorHandler);

let env = process.env.NODE_ENV;

if (env === "production") {
    app.listen(8001, "0.0.0.0");
} else {
    app.listen(8002, "0.0.0.0");
}
