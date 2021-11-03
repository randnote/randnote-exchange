"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("./db");
// constructor
var User = /** @class */ (function () {
    function User(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.password = user.password;
        this.email = user.email;
        this.verifiedEmail = user.verifiedEmail;
    }
    // create method:
    User.create = function (newuser, result) {
        sql.query("INSERT INTO users SET ?", newuser, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created user: ", __assign({ id: res.insertId }, newuser));
            result(null, __assign({ id: res.insertId }, newuser));
        });
    };
    // get all method:
    User.getAll = function (result) {
        sql.query("SELECT * FROM users", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("user: ", res);
            result(null, res);
        });
    };
    // find an user by ID method:
    User.findById = function (user, result) {
        sql.query("SELECT * FROM users WHERE id = " + user, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
            // havent found a user:
            result({ kind: "not_found" }, null);
        });
    };
    // login the user:
    User.login = function (obj, result) {
        sql.query("SELECT * FROM users WHERE email = " + obj.email + " AND password = " + obj.password, function (err, res) {
            if (err) {
                result({
                    success: false,
                    message: "wrong parameters provided",
                }, null);
                return;
            }
            if (res.length) {
                result(null, { success: "true", result: res[0] });
                // send success email here
                return;
            }
            result({ kind: "not_found" }, null);
        });
    };
    return User;
}()); // end of the class:
exports.default = User;
//# sourceMappingURL=user.model.js.map