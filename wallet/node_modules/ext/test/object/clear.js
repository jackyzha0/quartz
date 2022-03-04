"use strict";

var assert = require("chai").assert
  , clear  = require("../../object/clear");

describe("object/clear", function () {
	it("Should clear enumerable properties", function () {
		var obj = { foo: "bar", elo: "sfds" };
		clear(obj);
		// eslint-disable-next-line no-unreachable-loop
		for (var key in obj) throw new Error("Unexpected" + key);
	});
	it("Should return input object", function () {
		var obj = {};
		assert.equal(clear(obj), obj);
	});
	if (Object.defineProperty && Object.keys) {
		it("Should keep non enumerable properties", function () {
			var obj = { foo: "bar", elo: "sfds" };
			Object.defineProperty(obj, "hidden", { value: "some" });
			clear(obj);
			assert.deepEqual(Object.keys(obj), []);
			assert.equal(obj.hidden, "some");
		});
	}
});
