"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import queries:
var createTable_users_1 = require("./tables/createTable.users");
// import mysql functions:
var mysql = require("mysql");
var dbConfig = require("./db.config");
// Create a connection to the database
var connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});
// connect to the MySQL server
connection.connect(function (err) {
	if (err) {
		return console.error("error: " + err.message);
	}
	var createTable = function (query, msg) {
		connection.query(query, function (err, results, fields) {
			if (err) {
				console.log(err.message);
			} else {
				console.log(msg);
			}
		});
	};
	console.log("Successfully connected to the database.");
	createTable(
		createTable_users_1.createUsers,
		"Successfully created the users table"
	);
});
//# sourceMappingURL=createTables.js.map
