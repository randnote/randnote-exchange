"use strict";
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									? y["throw"] || ((t = y["return"]) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var module_model_1 = __importDefault(require("../models/module.model"));
/*incase i wanna create a quick user*/
// {
//   "firstname": "mac",
//   "lastname": "base",
//   "idnumber": 9704245550080,
//   "studentnumber": 201603838,
//   "institution_id": 1,
//   "password": "password",
//   "active": "true"
// }
/*
{
"institution_id": "1",
"teacher_id": "1",
"name": "Computer science 1",
"course_code": "COS1511",
"active": "true"
}
*/
exports.create = function (req, res) {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	var module = new module_model_1.default({
		institution_id: req.body.institution_id,
		teacher_id: req.body.teacher_id,
		name: req.body.name,
		course_code: req.body.course_code,
		active: req.body.active,
	});
	module_model_1.default.create(module, function (err, data) {
		if (err)
			res.status(500).send({
				success: "false",
				message:
					err.message || "Some error occurred while creating the Module.",
			});
		else res.send(data);
	});
};
exports.StudentToModule = function (req, res) {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	var theobject = {
		institution_id: req.body.institution_id,
		student_id: req.body.student_id,
		module_id: req.body.module_id,
		date_created: req.body.date_created,
	};
	module_model_1.default.linkStudentToModule(theobject, function (err, data) {
		if (err)
			res.status(500).send({
				success: "false",
				message:
					err.message || "Some error occurred while linking student to module.",
			});
		else res.send(data);
	});
};
exports.TeacherToModule = function (req, res) {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	var theobject = {
		institution_id: req.body.institution_id,
		teacher_id: req.body.teacher_id,
		module_id: req.body.module_id,
		date_created: req.body.date_created,
	};
	module_model_1.default.linkTeacherToModule(theobject, function (err, data) {
		if (err)
			res.status(500).send({
				success: "false",
				message:
					err.message || "Some error occurred while linking teacher to module.",
			});
		else res.send(data);
	});
};
//Retrieve all Modules from the database.
exports.findAll = function (req, res) {
	module_model_1.default.getAll(function (err, data) {
		if (err)
			res.status(500).send({
				success: "false",
				message: err.message || "Some error occurred while retrieving Modules.",
			});
		else res.send(data);
	});
};
exports.getStudentsModules = function (req, res) {
	module_model_1.default.getAllModulesPerStudent(
		req.params.student_id,
		function (err, data) {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						success: "false",
						message: "Not found Student with id " + req.params.student_id + ".",
					});
				} else {
					res.status(500).send({
						success: "false",
						message:
							"Error retrieving modules from a student that has the Id : " +
							req.params.student_id,
					});
				}
			} else res.send(data);
		}
	);
};
exports.deactivateModule = function (req, res) {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	var theobject = {
		module_id: req.body.module_id,
	};
	module_model_1.default.deactivateModule(theobject, function (err, data) {
		if (err)
			res.status(500).send({
				success: "false",
				message:
					err.message || "Some error occurred while deactivating the module.",
			});
		else res.send(data);
	});
};
exports.activateModule = function (req, res) {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		console.log("empty");
	}
	var theobject = {
		module_id: req.body.module_id,
	};
	module_model_1.default.activateModule(theobject, function (err, data) {
		if (err)
			res.status(500).send({
				success: "false",
				message:
					err.message || "Some error occurred while activating the module.",
			});
		else res.send(data);
	});
};
exports.getTeacherModules = function (req, res) {
	return __awaiter(void 0, void 0, void 0, function () {
		var teacher_id, getOtherData, loadData;
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					teacher_id = req.params.teacher_id;
					getOtherData = function () {
						return __awaiter(void 0, void 0, void 0, function () {
							var info, e_1;
							return __generator(this, function (_a) {
								switch (_a.label) {
									case 0:
										_a.trys.push([0, 2, , 3]);
										return [
											4 /*yield*/,
											module_model_1.default.getTeacherModuleConnections(
												teacher_id,
												function (err, data) {
													if (err) {
														if (err.kind === "not_found") {
															res.status(404).send({
																success: "false",
																message: "Not found",
															});
														} else {
															res.status(500).send({
																success: "false",
																message: "Error retrieving.... ",
															});
														}
													}
													info = data;
													loadData(data);
												}
											),
										];
									case 1:
										_a.sent();
										return [3 /*break*/, 3];
									case 2:
										e_1 = _a.sent();
										console.log(e_1);
										res.sendStatus(500);
										return [3 /*break*/, 3];
									case 3:
										return [2 /*return*/];
								}
							});
						});
					};
					loadData = function (info) {
						return __awaiter(void 0, void 0, void 0, function () {
							var ids, e_2;
							return __generator(this, function (_a) {
								switch (_a.label) {
									case 0:
										ids = [];
										_a.label = 1;
									case 1:
										_a.trys.push([1, 4, , 5]);
										return [
											4 /*yield*/,
											info.result.map(function (item) {
												ids.push(item.module_id);
											}),
										];
									case 2:
										_a.sent();
										return [
											4 /*yield*/,
											module_model_1.default.getTeacherModulesGivenTheirIds(
												ids,
												function (err, data) {
													if (err) {
														if (err.kind === "not_found") {
															res.status(404).send({
																success: "false",
																message: "Not found",
															});
														} else {
															res.status(500).send({
																success: "false",
																message: "Error retrieving.... ",
															});
														}
													}
													res.send(data);
												}
											),
										];
									case 3:
										_a.sent();
										return [3 /*break*/, 5];
									case 4:
										e_2 = _a.sent();
										console.log(e_2);
										res.sendStatus(500);
										return [3 /*break*/, 5];
									case 5:
										return [2 /*return*/];
								}
							});
						});
					};
					return [4 /*yield*/, getOtherData()];
				case 1:
					_a.sent();
					return [2 /*return*/];
			}
		});
	});
}; // end of getTeacherModules
/* response should be an array such as this
[
  {
    name: elemantary stats,
    couseCode: STAT1,
    students: 600,
    teachers: 4,
  }, {
    name: Chemistry 2,
    couseCode: CHLM2,
    students: 100,
    teachers: 1,
  }
]

*/
//# sourceMappingURL=module.controller.js.map
