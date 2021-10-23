"use strict";
// i will test my methods here:
Object.defineProperty(exports, "__esModule", { value: true });
// in the models, i need to make sure that all the functions call a result()-function somewhere
var assert = require("chai").assert;
var sayHello = require("../random").sayHello;
describe("Random", function () {
	it("app should return hello", function () {
		assert.equal(sayHello(), "hello");
	});
});
// tetst to be ran by github actions:
// describe('Student' , function(){
// 	it('Student.create() should return undefined', function(){
// 		const person = new Student({
// 			"institution_id" : 99,
// 	        "firstname": "99",
// 	        "idnumber": 99,
// 	        "lastname" : "99",
// 	        "studentnumber" : 99,
// 	        "password" : "99",
// 	        "active" : "false"
// 		});
// 		//call
// 		const result = Student.create(person ,(err: any, data: any) => {
// 			if(err){return "";}
// 		});
// 		assert.equal(result, undefined);
// 	});	// end of `it
// });
//# sourceMappingURL=test.js.map
