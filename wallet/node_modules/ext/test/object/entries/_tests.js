"use strict";

var assert = require("chai").assert;

module.exports = function (entries) {
	it("Should resolve entries array for an object", function () {
		assert.deepEqual(entries({ foo: "bar" }), [["foo", "bar"]]);
	});
	if (Object.defineProperty) {
		it("Should not resolve non-enumerable properties", function () {
			var obj = { visible: true };
			Object.defineProperty(obj, "hidden", { value: "elo" });
			assert.deepEqual(entries(obj), [["visible", true]]);
		});
	}
	it("Should resolve entries array for a primitive", function () {
		assert.deepEqual(entries("raz"), [
			["0", "r"], ["1", "a"], ["2", "z"]
		]);
	});
	it("Should throw on non-value", function () {
		assert["throws"](function () { entries(null); }, TypeError);
	});
};
