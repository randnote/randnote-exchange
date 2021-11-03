"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("../models/user.model"));
exports.create = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var user = new user_model_1.default({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.staffnumber,
        password: req.body.password,
        verifiedEmail: req.body.verifiedEmail,
    });
    console.log("body is ", req.body);
    user_model_1.default.create(user, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while creating the User.",
            });
        else
            res.send(data);
    });
};
exports.findAll = function (req, res) {
    user_model_1.default.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while retrieving Users.",
            });
        else
            res.send(data);
    });
};
exports.findOne = function (req, res) {
    user_model_1.default.findById(req.params.userId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found User with id " + req.params.userId + ".",
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId,
                });
            }
        }
        else
            res.send(data);
    });
};
exports.login = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        console.log("empty");
    }
    var obj = {
        username: req.body.username,
        password: req.body.password,
    };
    user_model_1.default.login(obj, function (err, data) {
        if (err)
            res /*.status(500)*/.send({
                success: "false",
                message: /*err.message ||*/ "wrong username or password",
            });
        else
            res.send(data);
    });
};
//# sourceMappingURL=users.controller.js.map