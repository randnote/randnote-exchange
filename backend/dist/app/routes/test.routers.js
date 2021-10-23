"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
	var Test = require("../controllers/test.controller");
	var Assignment = require("../controllers/assignment.controller");
	// test routes:
	// app.post("/createtest", Test.create);  // create a test
	// app.put("/edittest", Test.edit);// edit a test
	// app.delete("/deletetest", Test.delete);// delete a test
	// assignment routes:
	app.post("/createassignment", Assignment.create); // create assignment
	app.get(
		"/submittableAssignments/:institution_id/:module_id",
		Assignment.getSubmittables
	);
	// app.put("/editassignment", Assignment.edit);// edit an assignment
	// app.delete("/deleteassignment", Assignment.delete); // delete an assignment
};
//# sourceMappingURL=test.routers.js.map
