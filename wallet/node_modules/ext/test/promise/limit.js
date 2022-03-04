"use strict";

var assert = require("chai").assert
  , wait   = require("timers-ext/promise/sleep")
  , limit  = require("../../promise/limit").bind(Promise);

describe("promise/limit", function () {
	it("Should limit executions", function () {
		var count = 0;
		var callCount = 0;
		var limited = limit(2, function (arg1) {
			var id = ++count;
			assert.equal(arg1, "foo");
			assert.equal(arguments[1], id);
			return wait(10).then(function () { return id; });
		});
		limited("foo", ++callCount);
		assert.equal(count, 1);
		limited("foo", ++callCount);
		assert.equal(count, 2);
		limited("foo", ++callCount);
		assert.equal(count, 2);
		limited("foo", ++callCount);
		assert.equal(count, 2);
		return wait(25).then(function () {
			assert.equal(count, 4);
			limited("foo", ++callCount);
			assert.equal(count, 5);
			limited("foo", ++callCount);
			assert.equal(count, 6);
			limited("foo", ++callCount);
			assert.equal(count, 6);
			return wait(25).then(function () { assert.equal(count, 7); });
		});
	});

	it("Should resolve with expected result", function () {
		var count = 0;
		var limited = limit(2, function () {
			var id = ++count;
			return wait(10).then(function () { return id; });
		});
		limited();
		assert.equal(count, 1);
		limited();
		assert.equal(count, 2);
		return limited().then(function (result) {
			assert.equal(result, 3);
			limited().then(function (result) { assert.equal(result, 4); });
		});
	});
});
