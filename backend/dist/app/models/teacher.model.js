"use strict";
var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s)
						if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("./db");
// Teacher class:
var Teacher = /** @class */ (function () {
	function Teacher(teacher) {
		this.institution_id = teacher.institution_id;
		this.firstname = teacher.firstname;
		this.idnumber = teacher.idnumber;
		this.lastname = teacher.lastname;
		this.staffnumber = teacher.staffnumber;
		this.password = teacher.password;
		this.active = teacher.active;
	}
	// create method:
	Teacher.create = function (newteacher, result) {
		sql.query("INSERT INTO teachers SET ?", newteacher, function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			console.log(
				"created teacher: ",
				__assign({ id: res.insertId }, newteacher)
			);
			result(null, __assign({ id: res.insertId }, newteacher));
		});
	};
	// get all method:
	Teacher.getAll = function (result) {
		sql.query("SELECT * FROM teachers", function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}
			console.log("teacher: ", res);
			result(null, res);
		});
	};
	// find an teacher by ID method:
	Teacher.findById = function (teacher, result) {
		sql.query(
			"SELECT * FROM teachers WHERE id = " + teacher,
			function (err, res) {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}
				if (res.length) {
					console.log("found teacher: ", res[0]);
					result(null, res[0]);
					return;
				}
				// not found teacher with the id
				result({ kind: "not_found" }, null);
			}
		);
	};
	// login the teacher:
	Teacher.login = function (obj, result) {
		sql.query(
			"SELECT * FROM teachers WHERE staffnumber = " +
				obj.staffnumber +
				" AND password = " +
				obj.password,
			function (err, res) {
				if (err) {
					console.log("error: ", err);
					// result(err, null);
					result(
						{ success: false, message: "wrong parameters provided" },
						null
					);
					return;
				}
				if (res.length) {
					// console.log("found student: ", res[0]);
					result(null, { success: "true", result: res[0] });
					return;
				}
				// not found student with the id
				result({ kind: "not_found" }, null);
			}
		);
	};
	/*-----------*/
	Teacher.teachersFromInstitution = function (institution_id, result) {
		sql.query(
			"SELECT * FROM teachers WHERE institution_id = " + institution_id,
			function (err, res) {
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}
				if (res.length) {
					console.log("found teacher: ", res[0]);
					result(null, res[0]);
					return;
				}
				result({ kind: "not_found" }, null);
			}
		);
	};
	return Teacher;
})();
exports.default = Teacher; // end of the class:
//# sourceMappingURL=teacher.model.js.map
