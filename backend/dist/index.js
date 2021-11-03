#!/usr/bin/env nodejs:
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express_1.default();
app.use(bodyParser.json());
app.use(express_1.default.urlencoded({ extended: false }));
var allowedOrigins = ["http://localhost:3000", "http://locahost:3000/admin"];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            // return callback(new Error(msg), false);
            return callback(null, true); // allow all of em
        }
        return callback(null, true);
    },
}));
// require("./app/config/createTables");
// require("./app/routes/admins.routers")(app);
// require("./app/routes/teachers.routers")(app);
// require("./app/routes/students.routers")(app);
// require("./app/routes/modules.routers")(app);
// require("./app/emails/admins/login.email"); // still buggy
app.listen(8024, function () { return console.log("server started on port 8024"); });
//# sourceMappingURL=index.js.map