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
var Admin = /** @class */ (function () {
    function Admin(admin) {
        this.institution_id = admin.institution_id;
        this.firstname = admin.firstname;
        this.lastname = admin.lastname;
        this.staffnumber = admin.staffnumber;
        this.password = admin.password;
        this.active = admin.active;
    }
    // create method:
    Admin.create = function (newadmin, result) {
        sql.query("INSERT INTO admins SET ?", newadmin, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created admin: ", __assign({ id: res.insertId }, newadmin));
            result(null, __assign({ id: res.insertId }, newadmin));
        });
    };
    ;
    // get all method:
    Admin.getAll = function (result) {
        sql.query("SELECT * FROM admins", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("admin: ", res);
            result(null, res);
        });
    };
    ;
    // find an admin by ID method:
    Admin.findById = function (admin, result) {
        sql.query("SELECT * FROM admins WHERE id = " + admin, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            /*need to change this so that it returns an object that i want it to return
            instead of res[0],
            pass in an object
            */
            if (res.length) {
                console.log("found admin: ", res[0]);
                result(null, res[0]);
                return;
            }
            // not found admin with the id
            result({ kind: "not_found" }, null);
        });
    };
    ;
    // login the admin:
    Admin.login = function (obj, result) {
        sql.query("SELECT * FROM admins WHERE staffnumber = " + obj.username + " AND password = " + obj.password, function (err, res) {
            if (err) {
                // this error runs and gets displayed when for instance: User provides vague object
                // eg. doesnt give "{username: ***, "password: ***"}"
                result({ success: false, message: "wrong parameters provided" }, null);
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
    ;
    return Admin;
}());
exports.default = Admin;
; // end of the class:
//# sourceMappingURL=admin.model.js.map