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
// Students class:
var Student = /** @class */ (function () {
    function Student(student) {
        this.institution_id = student.institution_id;
        this.firstname = student.firstname;
        this.idnumber = student.idnumber;
        this.lastname = student.lastname;
        this.studentnumber = student.studentnumber;
        this.password = student.password;
        this.active = student.active;
    }
    // create method:
    Student.create = function (newstudent, result) {
        sql.query("INSERT INTO students SET ?", newstudent, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created student: ", __assign({ id: res.insertId }, newstudent));
            // result(null, { id: res.insertId, ...newstudent }); 
            result(null, { success: "true" });
        });
    };
    ;
    // get all method:
    Student.getAll = function (result) {
        sql.query("SELECT * FROM students", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("student: ", res);
            result(null, res);
        });
    };
    ;
    // find an student by ID method:
    Student.findById = function (student, result) {
        sql.query("SELECT * FROM students WHERE id = " + student, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result({ success: "false", message: "student not found" }, null);
                return;
            }
            if (res.length) {
                // console.log("found student: ", res[0]); // res[0] is an array with one object
                result(null, { success: "true", result: res[0] });
                return;
            }
            // not found student with the id
            result({ kind: "not_found" }, null);
        });
    };
    ;
    // login the student:
    Student.login = function (obj, result) {
        sql.query("SELECT * FROM students WHERE studentnumber = " + obj.studentnumber + " AND password = " + obj.password, function (err, res) {
            if (err) {
                console.log("error: ", err);
                // result(err, null);
                result({ success: false, message: "wrong parameters provided" }, null);
                return;
            }
            if (res.length) {
                // console.log("found student: ", res[0]);
                result(null, { success: "true", "result": res[0] });
                return;
            }
            // not found student with the id
            result({ kind: "not_found" }, null);
        });
    };
    ;
    /*-----------*/
    // this gets students ids given the institution_id; students that are in an institution
    Student.studentsIdsFromInstitution = function (institution_id, result) {
        sql.query("SELECT * FROM module_student WHERE institution_id = " + institution_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                // console.log("found student: ", res[0]);
                result(null, res);
                return;
            }
            result({ kind: "not_found" }, null);
        });
    };
    ;
    return Student;
}());
exports.default = Student;
; // end of the class:
//# sourceMappingURL=student.model.js.map