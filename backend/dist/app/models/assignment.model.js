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
// Assignment class:
var Assignment = /** @class */ (function () {
    function Assignment(assignment) {
        this.institution_id = assignment.institution_id;
        this.teacher_id = assignment.teacher_id;
        this.title = assignment.title;
        this.description = assignment.description;
        this.unique_code = assignment.unique_code;
        this.total_grade = assignment.total_grade;
        this.due_date = assignment.due_date;
        this.date_available = assignment.date_available;
        this.date_created = assignment.date_created;
    }
    // create method:
    Assignment.create = function (newassignment, result) {
        sql.query("INSERT INTO assignments SET ?", newassignment, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created assignment: ", __assign({ id: res.insertId }, newassignment));
            result(null, { success: "true" });
        });
    };
    // method to get all assignments:
    // method to get all assignments from a particular institution:
    Assignment.getAssignmentsFromInstitute = function (institution_id, module_id, result) {
        sql.query("SELECT * FROM assignments WHERE institution_id = " + institution_id + " AND module_id = " + module_id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("assignments: ", res);
            result(null, res);
        });
    };
    return Assignment;
}());
exports.default = Assignment;
//# sourceMappingURL=assignment.model.js.map