"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    var User = require("../controllers/admin.controller");
    app.post("/userlogin", User.login);
    app.post("/usercreate", User.create);
    app.get("/userfindall", User.findAll);
    app.get("/user/:userId", User.findOne);
};
//# sourceMappingURL=users.routers.js.map