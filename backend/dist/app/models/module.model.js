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
var Module = /** @class */ (function () {
    function Module(module) {
        this.institution_id = module.institution_id;
        this.teacher_id = module.teacher_id;
        this.name = module.name;
        this.course_code = module.course_code;
        this.active = module.active;
    }
    // create method:
    Module.create = function (newmodule, result) {
        sql.query("INSERT INTO modules SET ?", newmodule, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created module: ", __assign({ id: res.insertId }, newmodule));
            result(null, { success: "true" });
        });
    };
    // get all table method:
    Module.getAll = function (result) {
        sql.query("SELECT * FROM modules", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("modules: ", res);
            result(null, res);
        });
    };
    // method that counts the number of students that take a particular module(by module code):
    Module.getNumberOfStudentsPerModule = function (module_id, result) {
        sql.query("SELECT COUNT FROM module_student WHERE module_id = " + module_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result({ success: "false", message: "student not found" }, null);
                return;
            }
            if (res.length) {
                // console.log("found student: ", res[0]); // res[0] is an array with one object
                result(null, { success: "true" });
                return;
            }
            // not found student with the id
            result({ kind: "not_found" }, null);
        });
    };
    // need to create a method that links a student to a module:
    // meaning that the student select the module to be added to his list:
    /*takes in a module_id and student_id - as an object*/
    Module.linkStudentToModule = function (theobject, result) {
        sql.query("INSERT INTO module_student SET ?", theobject, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Linked student to module: ", __assign({ id: res.insertId }, theobject));
            result(null, { success: "true" });
        });
    };
    Module.linkTeacherToModule = function (theobject, result) {
        sql.query("INSERT INTO module_teacher SET ?", theobject, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Linked teacher to module: ", __assign({ id: res.insertId }, theobject));
            result(null, { success: "true" });
        });
    };
    // method that returns all modules linked to a student
    Module.getAllModulesPerStudent = function (student_id, result) {
        sql.query("SELECT * FROM module_student WHERE student_id=" + student_id + " ", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { success: "true", result: res });
        });
    };
    // method that deactivates a module:
    Module.deactivateModule = function (theobject, result) {
        sql.query("UPDATE modules SET active = false WHERE id=" + theobject.module_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { success: "true" });
        });
    };
    // method that activates a module:
    Module.activateModule = function (theobject, result) {
        sql.query("UPDATE modules SET active = true WHERE id=" + theobject.module_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { success: "true" });
        });
    };
    // this method will get me all the module_teachers that the teacher is liked to:
    Module.getTeacherModuleConnections = function (teacher_id, result) {
        sql.query("SELECT * FROM module_teacher WHERE teacher_id = " + teacher_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { success: "true", result: res });
        });
    };
    // method that returns all modules given the the id's recieved:
    // takes an array of numbers:
    Module.getTeacherModulesGivenTheirIds = function (array, result) {
        sql.query("SELECT * FROM modules WHERE id in (" + array + ")", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { success: "true", result: res });
        });
    };
    return Module;
}()); // end of the class.
exports.default = Module;
//# sourceMappingURL=module.model.js.map