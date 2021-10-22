"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var student_model_1 = __importDefault(require("../models/student.model"));
/*incase i wanna create a quick user*/
// const data1:person={
//   "firstname": "mac",
//   "lastname": "base",
//   "idnumber": 9704245550080,
//   "studentnumber": 201603838,
//   "institution_id": 1,
//   "password": "password",
//   "active": "true"
// }
// Create and Save a new Student
exports.create = (function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    // Create an Administrator
    /*I just noticed that this si not working, for some reason its not identifying the req's*/
    var student = new student_model_1.default({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        idnumber: req.body.idnumber,
        studentnumber: req.body.studentnumber,
        institution_id: req.body.institution_id,
        password: req.body.password,
        active: req.body.active
    });
    // console.log('body is ',req.body);
    // Save Student in the database
    student_model_1.default.create(student, function (err, data) {
        if (err)
            res.status(500).send({
                success: "false",
                message: err.message || "Some error occurred while creating the Student."
            });
        else
            res.send(data);
    });
});
//Retrieve all Student from the database.
exports.findAll = function (req, res) {
    student_model_1.default.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                success: "false",
                message: err.message || "Some error occurred while retrieving Teachers."
            });
        else
            res.send(data);
    });
};
// student
// Find a single Student with a studentId
exports.findOne = function (req, res) {
    student_model_1.default.findById(req.params.studentId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    success: "false",
                    message: "Not found Student with id " + req.params.studentId + "."
                });
            }
            else {
                res.status(500).send({
                    success: "false",
                    message: "Error retrieving Student with id " + req.params.studentId
                });
            }
        }
        else
            res.send(data);
    });
};
// login an student:
exports.login = (function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    var obj = {
        studentnumber: req.body.studentnumber,
        password: req.body.password
    };
    student_model_1.default.login(obj, function (err, data) {
        if (err)
            res /*.status(500)*/.send({
                success: "false",
                message: /*err.message ||*/ "wrong username or password"
            });
        else
            res.send(data);
    });
});
// get all students from a particular institution_id
exports.studentsFromInstitution = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var getStudentIdsGivenInstitutionId, getListOfStudentsGivenIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getStudentIdsGivenInstitutionId = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, student_model_1.default.studentsIdsFromInstitution(req.params.institutionId, function (err, data) {
                                        if (err) {
                                            if (err.kind === "not_found") {
                                                res.status(404).send({
                                                    success: "false",
                                                    message: "Not found Student with institution_id of " + req.params.institutionId + "."
                                                });
                                            }
                                            else {
                                                res.status(500).send({
                                                    success: "false",
                                                    message: "Error retrieving students with institution_id " + req.params.institutionId
                                                });
                                            }
                                        }
                                        else
                                            getListOfStudentsGivenIds(data);
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                console.log(e_1);
                                res.sendStatus(500);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); } // end of async function
                ;
                getListOfStudentsGivenIds = function (arr) { return __awaiter(void 0, void 0, void 0, function () {
                    var arrOfStudentIds_2, arrOfStudentObjects_1, arrOfStudentIds_1, arrOfStudentIds_1_1, studentId, _a, _b, e_2_1, func, e_3;
                    var e_2, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _d.trys.push([0, 15, , 16]);
                                arrOfStudentIds_2 = [];
                                arrOfStudentObjects_1 = [];
                                return [4 /*yield*/, arr.forEach(function (obj) {
                                        arrOfStudentIds_2.push(obj.student_id);
                                    })];
                            case 1:
                                _d.sent();
                                console.log(arrOfStudentIds_2);
                                _d.label = 2;
                            case 2:
                                _d.trys.push([2, 8, 9, 14]);
                                arrOfStudentIds_1 = __asyncValues(arrOfStudentIds_2);
                                _d.label = 3;
                            case 3: return [4 /*yield*/, arrOfStudentIds_1.next()];
                            case 4:
                                if (!(arrOfStudentIds_1_1 = _d.sent(), !arrOfStudentIds_1_1.done)) return [3 /*break*/, 7];
                                studentId = arrOfStudentIds_1_1.value;
                                //let studentId: any = arrOfStudentIds[i];
                                console.log(studentId);
                                _b = (_a = arrOfStudentObjects_1).push;
                                return [4 /*yield*/, student_model_1.default.findById(studentId, function (err, result) {
                                        if (err) {
                                            if (err.kind === "not_found") {
                                                res.status(404).send({
                                                    success: "false",
                                                    message: "Not found Student with id " + studentId + "."
                                                });
                                            }
                                            else {
                                                res.status(500).send({
                                                    success: "false",
                                                    message: "Error retrieving Student with id " + studentId
                                                });
                                            }
                                        }
                                        else {
                                            // console.log('executed')
                                            // console.log(result)
                                            //    arrOfStudentObjects.push(result);
                                            //  console.log('arr is ',arrOfStudentObjects)
                                            return result;
                                        }
                                    })];
                            case 5:
                                _b.apply(_a, [_d.sent()]);
                                _d.label = 6;
                            case 6: return [3 /*break*/, 3];
                            case 7: return [3 /*break*/, 14];
                            case 8:
                                e_2_1 = _d.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 14];
                            case 9:
                                _d.trys.push([9, , 12, 13]);
                                if (!(arrOfStudentIds_1_1 && !arrOfStudentIds_1_1.done && (_c = arrOfStudentIds_1.return))) return [3 /*break*/, 11];
                                return [4 /*yield*/, _c.call(arrOfStudentIds_1)];
                            case 10:
                                _d.sent();
                                _d.label = 11;
                            case 11: return [3 /*break*/, 13];
                            case 12:
                                if (e_2) throw e_2.error;
                                return [7 /*endfinally*/];
                            case 13: return [7 /*endfinally*/];
                            case 14:
                                func = function () { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                console.log('resulted');
                                                return [4 /*yield*/, res.send('is: ' + arrOfStudentObjects_1)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                return [3 /*break*/, 16];
                            case 15:
                                e_3 = _d.sent();
                                console.log(e_3);
                                res.sendStatus(500);
                                return [3 /*break*/, 16];
                            case 16: return [2 /*return*/];
                        }
                    });
                }); };
                return [4 /*yield*/, getStudentIdsGivenInstitutionId()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }; // end of students from instituition
//# sourceMappingURL=student.controller.js.map