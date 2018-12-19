const nodeFetch = require("node-fetch");
const requestUrl = require("../config/index")();
const METHODS = ["get", "delete"];
const BODY_METHODS = ["post", "put", "patch"];

const request = function(url, method, params = {}, headers = {}) {
    let body,
        url1 = "";
    if (/^https?:\/\//.test(url)) {
        url1 = url;
    } else {
        url1 = requestUrl + url;
    }
    let header = {
        "Content-Type": "application/json",
        ...headers
    };

    if (METHODS.includes(method)) {
        const _params = [];
        for (let key in params) {
            _params.push(`${key}=${params[key]}`);
        }
        if (_params.length) {
            url1 += "?";
            url1 += _params.join("&");
        }
    } else {
        body = JSON.stringify(params);
    }
    return nodeFetch(url1, {
        method,
        body,
        header
    })
        .then(res => {
            if (200 <= res.stauts < 300) {
                return res;
            }
        })
        .then(res => {
            if (header["Content-Type"].indexOf("json") != -1) {
                return res.json();
            } else {
                return res.text();
            }
        });
};
var mothods = {};
[...METHODS, ...BODY_METHODS].forEach(method => {
    mothods[method] = ({ url, params, headers }) => {
        return request(url, method, params, headers);
    };
});

module.exports = mothods;
