"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var teacher_model_1 = __importDefault(require("../models/teacher.model"));
/*incase i wanna create a quick user*/
var data1 = {
    "firstname": "daniel",
    "lastname": "mamphekgo",
    "idnumber": 9704245550080,
    "staffnumber": 2020,
    "institution_id": 1,
    "password": "password",
    "active": "true"
};
// Create and Save a new Student
exports.create = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    var teacher = new teacher_model_1.default({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        idnumber: req.body.idnumber,
        staffnumber: req.body.staffnumber,
        institution_id: req.body.institution_id,
        password: req.body.password,
        active: req.body.active
    });
    console.log('body is ', req.body);
    teacher_model_1.default.create(teacher, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Teacher."
            });
        else
            res.send(data);
    });
};
exports.findAll = function (req, res) {
    teacher_model_1.default.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Teachers."
            });
        else
            res.send(data);
    });
};
exports.findOne = function (req, res) {
    teacher_model_1.default.findById(req.params.teacherId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Teacher with id " + req.params.teacherId + "."
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Teacher with id " + req.params.teacherId
                });
            }
        }
        else
            res.send(data);
    });
};
exports.login = (function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    var obj = {
        staffnumber: req.body.staffnumber,
        password: req.body.password
    };
    teacher_model_1.default.login(obj, function (err, data) {
        if (err)
            res /*.status(500)*/.send({
                success: "false",
                message: /*err.message ||*/ "wrong username or password"
            });
        else
            res.send(data);
    });
});
exports.teachersFromInstitution = function (req, res) {
    teacher_model_1.default.teachersFromInstitution(req.params.institution_id, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Teacher with institution_id of " + req.params.institution_id + "."
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Teachers with institution_id " + req.params.institution_id
                });
            }
        }
        else
            res.send(data);
    });
};
//# sourceMappingURL=teacher.controller.js.map