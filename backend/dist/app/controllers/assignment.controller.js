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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assignment_model_1 = __importDefault(require("../models/assignment.model"));
/*incase i wanna create a quick assignment*/
var data1 = {
    "institution_id": 1,
    "teacher_id": 1,
    "title": "the econ assignment 1",
    "description": "macroeconomics ",
    "unique_code": "112132",
    "total_grade": 50,
    "due_date": "2020/04/24",
    "date_available": "2020/04/01",
    "date_created": "2020/04/01"
};
exports.create = (function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    var assignment = new assignment_model_1.default({
        institution_id: req.body.institution_id,
        teacher_id: req.body.teacher_id,
        title: req.body.title,
        description: req.body.description,
        unique_code: req.body.unique_code,
        total_grade: req.body.total_grade,
        due_date: req.body.due_date,
        date_available: req.body.date_available,
        date_created: req.body.date_created
    });
    assignment_model_1.default.create(assignment, function (err, data) {
        if (err)
            res.status(500).send({
                success: "false",
                message: err.message || "Some error occurred while creating the Assignment."
            });
        else
            res.send(data);
    });
});
exports.submittableAssignments = function (req, res) {
    // start by getting all assignments from the database(from a particular institution) (particular module)
    /*
      then loop through all of them and filter out all the ones that dont appear in assignment_submissions table
        
    */
    var institution_id = req.params.institution_id;
    var module_id = req.params.module_id;
    var getAssignmentsFromInstituteFunc = function () { return __awaiter(void 0, void 0, void 0, function () {
        var info, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, assignment_model_1.default.getAssignmentsFromInstitute(institution_id, module_id, function (err, data) {
                            if (err) {
                                if (err.kind === "not_found") {
                                    res.status(404).send({
                                        success: "false",
                                        message: "Not found",
                                    });
                                }
                                else {
                                    res.status(500).send({
                                        success: "false",
                                        message: "Error retrieving.... ",
                                    });
                                }
                            }
                            info = data;
                            // loadData(data);
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
    }); };
};
exports.findAll = function (req, res) {
    // Student.getAll((err:any, data:any): any => {
    //   if (err)
    //     res.status(500).send({
    //       success: "false",
    //       message:
    //         err.message || "Some error occurred while retrieving Teachers."
    //     });
    //   else res.send(data);
    // });
};
// Find a single Student with a studentId
exports.findOne = function (req, res) {
    // Student.findById(req.params.studentId, (err: any, data: any) => {
    //   if (err) {
    //     if (err.kind === "not_found") {
    //       res.status(404).send({
    //         success: "false",
    //         message: `Not found Student with id ${req.params.studentId}.`
    //       });
    //     } else {
    //       res.status(500).send({
    //         success: "false",
    //         message: "Error retrieving Student with id " + req.params.studentId
    //       });
    //     }
    //   } else res.send(data);
    // });
};
//# sourceMappingURL=assignment.controller.js.map