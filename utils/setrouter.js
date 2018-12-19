const Router = require("koa-router");
const path = require("path");
const fs = require("fs");
const getDirList = function(p, parent) {
    let dirArr = fs.readdirSync(p);
    let res = {};
    dirArr.map(item => {
        let filedir = path.join(p, item);
        let isDir = fs.statSync(filedir).isDirectory();
        let key =
            item.indexOf(".") != -1
                ? item.substr(0, item.lastIndexOf("."))
                : item;
        res[key] = {};
        if (isDir) {
            res[key] = getDirList(filedir, key);
        } else {
            res[key] = filedir;
            if (parent) {
                res["parent"] = parent;
            }
        }
    });
    return res;
};

const getRoutes = function() {
    let routesPath = path.join(__dirname, "../routes");
    let res = getDirList(routesPath);
    return res;
};
//获取routes文件夹下文件配置
const routes = getRoutes();
//处理routes文件夹下路由
let baseRoute = new Router();
const setRouter = function(r) {
    let keys = Object.keys(r);
    if (keys && keys.length > 0) {
        keys.map(item => {
            if (typeof r[item] == "string") {
                if (item != "parent") {
                    let router = require(r[item]);
                    if (router) {
                        baseRoute.use(`/${r.parent}/${item}`, router.routes());
                    }
                }
            } else {
                setRouter(r[item]);
            }
        });
    }
};
setRouter(routes);
module.exports = baseRoute;
