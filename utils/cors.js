const cors = require("koa2-cors");
const crosEvent = cors({
    origin: function(ctx) {
        return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 10,
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
});
module.exports = crosEvent;
