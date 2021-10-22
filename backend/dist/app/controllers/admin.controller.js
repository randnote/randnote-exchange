"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin_model_1 = __importDefault(require("../models/admin.model"));
/*incase i wanna create a quick user*/
var data1 = {
    "institution_id": 1,
    "firstname": "daniel",
    "lastname": "mamphekgo",
    "staffnumber": "2021",
    "password": "password",
    "active": "true"
};
exports.create = (function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    var admin = new admin_model_1.default({
        institution_id: req.body.institution_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        staffnumber: req.body.staffnumber,
        password: req.body.password,
        active: req.body.active
    });
    console.log('body is ', req.body);
    admin_model_1.default.create(admin, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Admin."
            });
        else
            res.send(data);
    });
});
exports.findAll = function (req, res) {
    admin_model_1.default.getAll(function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Admins."
            });
        else
            res.send(data);
    });
};
exports.findOne = function (req, res) {
    admin_model_1.default.findById(req.params.adminId, function (err, data) {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Admin with id " + req.params.adminId + "."
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Admin with id " + req.params.adminId
                });
            }
        }
        else
            res.send(data);
    });
};
exports.login = (function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        console.log("empty");
    }
    var obj = {
        username: req.body.username,
        password: req.body.password
    };
    admin_model_1.default.login(obj, function (err, data) {
        if (err)
            res /*.status(500)*/.send({
                success: "false",
                message: /*err.message ||*/ "wrong username or password"
            });
        else
            res.send(data);
    });
});
// // Update a Student identified by the studentId in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }
//   Student.updateById(
//     req.params.studentId,
//     new Student(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Student with id ${req.params.studentId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Student with id " + req.params.studentId
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };
// // Delete a Student with the specified studentId in the request
// exports.delete = (req, res) => {
//   Student.remove(req.params.studentId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Student with id ${req.params.studentId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Student with id " + req.params.studentId
//         });
//       }
//     } else res.send({ message: `Student was deleted successfully!` });
//   });
// };
//# sourceMappingURL=admin.controller.js.map