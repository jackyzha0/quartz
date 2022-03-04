/*!
 * v2.1.4-104-gc868b3a
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("oboe", [], factory);
	else if(typeof exports === 'object')
		exports["oboe"] = factory();
	else
		root["oboe"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return partialComplete; });
/* unused harmony export compose */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return compose2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return attr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return lazyUnion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return varArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return flip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return lazyIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return always; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return functor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lists__ = __webpack_require__(1);


/**
 * Partially complete a function.
 *
 *  var add3 = partialComplete( function add(a,b){return a+b}, 3 );
 *
 *  add3(4) // gives 7
 *
 *  function wrap(left, right, cen){return left + " " + cen + " " + right;}
 *
 *  var pirateGreeting = partialComplete( wrap , "I'm", ", a mighty pirate!" );
 *
 *  pirateGreeting("Guybrush Threepwood");
 *  // gives "I'm Guybrush Threepwood, a mighty pirate!"
 */
var partialComplete = varArgs(function (fn, args) {
  // this isn't the shortest way to write this but it does
  // avoid creating a new array each time to pass to fn.apply,
  // otherwise could just call boundArgs.concat(callArgs)

  var numBoundArgs = args.length

  return varArgs(function (callArgs) {
    for (var i = 0; i < callArgs.length; i++) {
      args[numBoundArgs + i] = callArgs[i]
    }

    args.length = numBoundArgs + callArgs.length

    return fn.apply(this, args)
  })
})

/**
* Compose zero or more functions:
*
*    compose(f1, f2, f3)(x) = f1(f2(f3(x))))
*
* The last (inner-most) function may take more than one parameter:
*
*    compose(f1, f2, f3)(x,y) = f1(f2(f3(x,y))))
*/
var compose = varArgs(function (fns) {
  var fnsList = Object(__WEBPACK_IMPORTED_MODULE_0__lists__["c" /* arrayAsList */])(fns)

  function next (params, curFn) {
    return [apply(params, curFn)]
  }

  return varArgs(function (startParams) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__lists__["f" /* foldR */])(next, startParams, fnsList)[0]
  })
})

/**
* A more optimised version of compose that takes exactly two functions
* @param f1
* @param f2
*/
function compose2 (f1, f2) {
  return function () {
    return f1.call(this, f2.apply(this, arguments))
  }
}

/**
* Generic form for a function to get a property from an object
*
*    var o = {
*       foo:'bar'
*    }
*
*    var getFoo = attr('foo')
*
*    fetFoo(o) // returns 'bar'
*
* @param {String} key the property name
*/
function attr (key) {
  return function (o) { return o[key] }
}

/**
* Call a list of functions with the same args until one returns a
* truthy result. Similar to the || operator.
*
* So:
*      lazyUnion([f1,f2,f3 ... fn])( p1, p2 ... pn )
*
* Is equivalent to:
*      apply([p1, p2 ... pn], f1) ||
*      apply([p1, p2 ... pn], f2) ||
*      apply([p1, p2 ... pn], f3) ... apply(fn, [p1, p2 ... pn])
*
* @returns the first return value that is given that is truthy.
*/
var lazyUnion = varArgs(function (fns) {
  return varArgs(function (params) {
    var maybeValue

    for (var i = 0; i < attr('length')(fns); i++) {
      maybeValue = apply(params, fns[i])

      if (maybeValue) {
        return maybeValue
      }
    }
  })
})

/**
* This file declares various pieces of functional programming.
*
* This isn't a general purpose functional library, to keep things small it
* has just the parts useful for Oboe.js.
*/

/**
* Call a single function with the given arguments array.
* Basically, a functional-style version of the OO-style Function#apply for
* when we don't care about the context ('this') of the call.
*
* The order of arguments allows partial completion of the arguments array
*/
function apply (args, fn) {
  return fn.apply(undefined, args)
}

/**
* Define variable argument functions but cut out all that tedious messing about
* with the arguments object. Delivers the variable-length part of the arguments
* list as an array.
*
* Eg:
*
* var myFunction = varArgs(
*    function( fixedArgument, otherFixedArgument, variableNumberOfArguments ){
*       console.log( variableNumberOfArguments );
*    }
* )
*
* myFunction('a', 'b', 1, 2, 3); // logs [1,2,3]
*
* var myOtherFunction = varArgs(function( variableNumberOfArguments ){
*    console.log( variableNumberOfArguments );
* })
*
* myFunction(1, 2, 3); // logs [1,2,3]
*
*/
function varArgs (fn) {
  var numberOfFixedArguments = fn.length - 1
  var slice = Array.prototype.slice

  if (numberOfFixedArguments === 0) {
    // an optimised case for when there are no fixed args:

    return function () {
      return fn.call(this, slice.call(arguments))
    }
  } else if (numberOfFixedArguments === 1) {
    // an optimised case for when there are is one fixed args:

    return function () {
      return fn.call(this, arguments[0], slice.call(arguments, 1))
    }
  }

  // general case

  // we know how many arguments fn will always take. Create a
  // fixed-size array to hold that many, to be re-used on
  // every call to the returned function
  var argsHolder = Array(fn.length)

  return function () {
    for (var i = 0; i < numberOfFixedArguments; i++) {
      argsHolder[i] = arguments[i]
    }

    argsHolder[numberOfFixedArguments] =
      slice.call(arguments, numberOfFixedArguments)

    return fn.apply(this, argsHolder)
  }
}

/**
* Swap the order of parameters to a binary function
*
* A bit like this flip: http://zvon.org/other/haskell/Outputprelude/flip_f.html
*/
function flip (fn) {
  return function (a, b) {
    return fn(b, a)
  }
}

/**
* Create a function which is the intersection of two other functions.
*
* Like the && operator, if the first is truthy, the second is never called,
* otherwise the return value from the second is returned.
*/
function lazyIntersection (fn1, fn2) {
  return function (param) {
    return fn1(param) && fn2(param)
  }
}

/**
* A function which does nothing
*/
function noop () { }

/**
* A function which is always happy
*/
function always () { return true }

/**
* Create a function which always returns the same
* value
*
* var return3 = functor(3);
*
* return3() // gives 3
* return3() // still gives 3
* return3() // will always give 3
*/
function functor (val) {
  return function () {
    return val
  }
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return cons; });
/* unused harmony export emptyList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return head; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return tail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return arrayAsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return listAsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return foldR; });
/* unused harmony export foldR1 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return without; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return applyEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return reverseList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return first; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functional__ = __webpack_require__(0);


/**
 * Like cons in Lisp
 */
function cons (x, xs) {
  /* Internally lists are linked 2-element Javascript arrays.

      Ideally the return here would be Object.freeze([x,xs])
      so that bugs related to mutation are found fast.
      However, cons is right on the critical path for
      performance and this slows oboe-mark down by
      ~25%. Under theoretical future JS engines that freeze more
      efficiently (possibly even use immutability to
      run faster) this should be considered for
      restoration.
   */

  return [x, xs]
}

/**
 * The empty list
 */
var emptyList = null

/**
 * Get the head of a list.
 *
 * Ie, head(cons(a,b)) = a
 */
var head = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["c" /* attr */])(0)

/**
 * Get the tail of a list.
 *
 * Ie, tail(cons(a,b)) = b
 */
var tail = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["c" /* attr */])(1)

/**
 * Converts an array to a list
 *
 *    asList([a,b,c])
 *
 * is equivalent to:
 *
 *    cons(a, cons(b, cons(c, emptyList)))
 **/
function arrayAsList (inputArray) {
  return reverseList(
    inputArray.reduce(
      Object(__WEBPACK_IMPORTED_MODULE_0__functional__["e" /* flip */])(cons),
      emptyList
    )
  )
}

/**
 * A varargs version of arrayAsList. Works a bit like list
 * in LISP.
 *
 *    list(a,b,c)
 *
 * is equivalent to:
 *
 *    cons(a, cons(b, cons(c, emptyList)))
 */
var list = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["k" /* varArgs */])(arrayAsList)

/**
 * Convert a list back to a js native array
 */
function listAsArray (list) {
  return foldR(function (arraySoFar, listItem) {
    arraySoFar.unshift(listItem)
    return arraySoFar
  }, [], list)
}

/**
 * Map a function over a list
 */
function map (fn, list) {
  return list
    ? cons(fn(head(list)), map(fn, tail(list)))
    : emptyList
}

/**
 * foldR implementation. Reduce a list down to a single value.
 *
 * @pram {Function} fn     (rightEval, curVal) -> result
 */
function foldR (fn, startValue, list) {
  return list
    ? fn(foldR(fn, startValue, tail(list)), head(list))
    : startValue
}

/**
 * foldR implementation. Reduce a list down to a single value.
 *
 * @pram {Function} fn     (rightEval, curVal) -> result
 */
function foldR1 (fn, list) {
  return tail(list)
    ? fn(foldR1(fn, tail(list)), head(list))
    : head(list)
}

/**
 * Return a list like the one given but with the first instance equal
 * to item removed
 */
function without (list, test, removedFn) {
  return withoutInner(list, removedFn || __WEBPACK_IMPORTED_MODULE_0__functional__["i" /* noop */])

  function withoutInner (subList, removedFn) {
    return subList
      ? (test(head(subList))
        ? (removedFn(head(subList)), tail(subList))
        : cons(head(subList), withoutInner(tail(subList), removedFn))
      )
      : emptyList
  }
}

/**
 * Returns true if the given function holds for every item in
 * the list, false otherwise
 */
function all (fn, list) {
  return !list ||
    (fn(head(list)) && all(fn, tail(list)))
}

/**
 * Call every function in a list of functions with the same arguments
 *
 * This doesn't make any sense if we're doing pure functional because
 * it doesn't return anything. Hence, this is only really useful if the
 * functions being called have side-effects.
 */
function applyEach (fnList, args) {
  if (fnList) {
    head(fnList).apply(null, args)

    applyEach(tail(fnList), args)
  }
}

/**
 * Reverse the order of a list
 */
function reverseList (list) {
  // js re-implementation of 3rd solution from:
  //    http://www.haskell.org/haskellwiki/99_questions/Solutions/5
  function reverseInner (list, reversedAlready) {
    if (!list) {
      return reversedAlready
    }

    return reverseInner(tail(list), cons(head(list), reversedAlready))
  }

  return reverseInner(list, emptyList)
}

function first (test, list) {
  return list &&
    (test(head(list))
      ? head(list)
      : first(test, tail(list)))
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isOfType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasAllProperties; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lists__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functional__ = __webpack_require__(0);



/**
 * This file defines some loosely associated syntactic sugar for
 * Javascript programming
 */

/**
 * Returns true if the given candidate is of type T
 */
function isOfType (T, maybeSomething) {
  return maybeSomething && maybeSomething.constructor === T
}

var len = Object(__WEBPACK_IMPORTED_MODULE_1__functional__["c" /* attr */])('length')
var isString = Object(__WEBPACK_IMPORTED_MODULE_1__functional__["j" /* partialComplete */])(isOfType, String)

/**
 * I don't like saying this:
 *
 *    foo !=== undefined
 *
 * because of the double-negative. I find this:
 *
 *    defined(foo)
 *
 * easier to read.
 */
function defined (value) {
  return value !== undefined
}

/**
 * Returns true if object o has a key named like every property in
 * the properties array. Will give false if any are missing, or if o
 * is not an object.
 */
function hasAllProperties (fieldList, o) {
  return (o instanceof Object) &&
    Object(__WEBPACK_IMPORTED_MODULE_0__lists__["a" /* all */])(function (field) {
      return (field in o)
    }, fieldList)
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NODE_OPENED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NODE_CLOSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return NODE_SWAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return NODE_DROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FAIL_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ROOT_NODE_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return ROOT_PATH_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HTTP_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return STREAM_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return STREAM_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ABORTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SAX_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return SAX_VALUE_OPEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SAX_VALUE_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return errorReport; });
/**
 * This file declares some constants to use as names for event types.
 */

// the events which are never exported are kept as
// the smallest possible representation, in numbers:
var _S = 1

// fired whenever a new node starts in the JSON stream:
var NODE_OPENED = _S++

// fired whenever a node closes in the JSON stream:
var NODE_CLOSED = _S++

// called if a .node callback returns a value -
var NODE_SWAP = _S++
var NODE_DROP = _S++

var FAIL_EVENT = 'fail'

var ROOT_NODE_FOUND = _S++
var ROOT_PATH_FOUND = _S++

var HTTP_START = 'start'
var STREAM_DATA = 'data'
var STREAM_END = 'end'
var ABORTING = _S++

// SAX events butchered from Clarinet
var SAX_KEY = _S++
var SAX_VALUE_OPEN = _S++
var SAX_VALUE_CLOSE = _S++

function errorReport (statusCode, body, error) {
  try {
    var jsonBody = JSON.parse(body)
  } catch (e) { }

  return {
    statusCode: statusCode,
    body: body,
    jsonBody: jsonBody,
    thrown: error
  }
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return namedNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return keyOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return nodeOf; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functional__ = __webpack_require__(0);


/**
 * Get a new key->node mapping
 *
 * @param {String|Number} key
 * @param {Object|Array|String|Number|null} node a value found in the json
 */
function namedNode (key, node) {
  return {key: key, node: node}
}

/** get the key of a namedNode */
var keyOf = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["c" /* attr */])('key')

/** get the node from a namedNode */
var nodeOf = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["c" /* attr */])('node')




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return oboe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lists__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functional__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__defaults__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wire__ = __webpack_require__(9);






// export public API
function oboe (arg1) {
  // We use duck-typing to detect if the parameter given is a stream, with the
  // below list of parameters.
  // Unpipe and unshift would normally be present on a stream but this breaks
  // compatibility with Request streams.
  // See https://github.com/jimhigson/oboe.js/issues/65

  var nodeStreamMethodNames = Object(__WEBPACK_IMPORTED_MODULE_0__lists__["h" /* list */])('resume', 'pause', 'pipe')
  var isStream = Object(__WEBPACK_IMPORTED_MODULE_1__functional__["j" /* partialComplete */])(
    __WEBPACK_IMPORTED_MODULE_2__util__["b" /* hasAllProperties */],
    nodeStreamMethodNames
  )

  if (arg1) {
    if (isStream(arg1) || Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isString */])(arg1)) {
      //  simple version for GETs. Signature is:
      //    oboe( url )
      //  or, under node:
      //    oboe( readableStream )
      return Object(__WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* applyDefaults */])(
        __WEBPACK_IMPORTED_MODULE_4__wire__["a" /* wire */],
        arg1 // url
      )
    } else {
      // method signature is:
      //    oboe({method:m, url:u, body:b, headers:{...}})

      return Object(__WEBPACK_IMPORTED_MODULE_3__defaults__["a" /* applyDefaults */])(
        __WEBPACK_IMPORTED_MODULE_4__wire__["a" /* wire */],
        arg1.url,
        arg1.method,
        arg1.body,
        arg1.headers,
        arg1.withCredentials,
        arg1.cached
      )
    }
  } else {
    // wire up a no-AJAX, no-stream Oboe. Will have to have content
    // fed in externally and using .emit.
    return Object(__WEBPACK_IMPORTED_MODULE_4__wire__["a" /* wire */])()
  }
}

/* oboe.drop is a special value. If a node callback returns this value the
   parsed node is deleted from the JSON
 */
oboe.drop = function () {
  return oboe.drop
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return incrementalContentBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROOT_PATH; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ascent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lists__ = __webpack_require__(1);





/**
 * This file provides various listeners which can be used to build up
 * a changing ascent based on the callbacks provided by Clarinet. It listens
 * to the low-level events from Clarinet and emits higher-level ones.
 *
 * The building up is stateless so to track a JSON file
 * ascentManager.js is required to store the ascent state
 * between calls.
 */

/**
 * A special value to use in the path list to represent the path 'to' a root
 * object (which doesn't really have any path). This prevents the need for
 * special-casing detection of the root object and allows it to be treated
 * like any other object. We might think of this as being similar to the
 * 'unnamed root' domain ".", eg if I go to
 * http://en.wikipedia.org./wiki/En/Main_page the dot after 'org' deliminates
 * the unnamed root of the DNS.
 *
 * This is kept as an object to take advantage that in Javascript's OO objects
 * are guaranteed to be distinct, therefore no other object can possibly clash
 * with this one. Strings, numbers etc provide no such guarantee.
 **/
var ROOT_PATH = {}

/**
 * Create a new set of handlers for clarinet's events, bound to the emit
 * function given.
 */
function incrementalContentBuilder (oboeBus) {
  var emitNodeOpened = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["f" /* NODE_OPENED */]).emit
  var emitNodeClosed = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["d" /* NODE_CLOSED */]).emit
  var emitRootOpened = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["i" /* ROOT_PATH_FOUND */]).emit
  var emitRootClosed = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["h" /* ROOT_NODE_FOUND */]).emit

  function arrayIndicesAreKeys (possiblyInconsistentAscent, newDeepestNode) {
    /* for values in arrays we aren't pre-warned of the coming paths
         (Clarinet gives no call to onkey like it does for values in objects)
         so if we are in an array we need to create this path ourselves. The
         key will be len(parentNode) because array keys are always sequential
         numbers. */

    var parentNode = Object(__WEBPACK_IMPORTED_MODULE_1__ascent__["c" /* nodeOf */])(Object(__WEBPACK_IMPORTED_MODULE_3__lists__["g" /* head */])(possiblyInconsistentAscent))

    return Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* isOfType */])(Array, parentNode)
      ? keyFound(possiblyInconsistentAscent,
        Object(__WEBPACK_IMPORTED_MODULE_2__util__["e" /* len */])(parentNode),
        newDeepestNode
      )
      // nothing needed, return unchanged
      : possiblyInconsistentAscent
  }

  function nodeOpened (ascent, newDeepestNode) {
    if (!ascent) {
      // we discovered the root node,
      emitRootOpened(newDeepestNode)

      return keyFound(ascent, ROOT_PATH, newDeepestNode)
    }

    // we discovered a non-root node

    var arrayConsistentAscent = arrayIndicesAreKeys(ascent, newDeepestNode)
    var ancestorBranches = Object(__WEBPACK_IMPORTED_MODULE_3__lists__["l" /* tail */])(arrayConsistentAscent)
    var previouslyUnmappedName = Object(__WEBPACK_IMPORTED_MODULE_1__ascent__["a" /* keyOf */])(Object(__WEBPACK_IMPORTED_MODULE_3__lists__["g" /* head */])(arrayConsistentAscent))

    appendBuiltContent(
      ancestorBranches,
      previouslyUnmappedName,
      newDeepestNode
    )

    return Object(__WEBPACK_IMPORTED_MODULE_3__lists__["d" /* cons */])(
      Object(__WEBPACK_IMPORTED_MODULE_1__ascent__["b" /* namedNode */])(previouslyUnmappedName, newDeepestNode),
      ancestorBranches
    )
  }

  /**
    * Add a new value to the object we are building up to represent the
    * parsed JSON
    */
  function appendBuiltContent (ancestorBranches, key, node) {
    Object(__WEBPACK_IMPORTED_MODULE_1__ascent__["c" /* nodeOf */])(Object(__WEBPACK_IMPORTED_MODULE_3__lists__["g" /* head */])(ancestorBranches))[key] = node
  }

  /**
    * For when we find a new key in the json.
    *
    * @param {String|Number|Object} newDeepestName the key. If we are in an
    *    array will be a number, otherwise a string. May take the special
    *    value ROOT_PATH if the root node has just been found
    *
    * @param {String|Number|Object|Array|Null|undefined} [maybeNewDeepestNode]
    *    usually this won't be known so can be undefined. Can't use null
    *    to represent unknown because null is a valid value in JSON
    **/
  function keyFound (ascent, newDeepestName, maybeNewDeepestNode) {
    if (ascent) { // if not root
      // If we have the key but (unless adding to an array) no known value
      // yet. Put that key in the output but against no defined value:
      appendBuiltContent(ascent, newDeepestName, maybeNewDeepestNode)
    }

    var ascentWithNewPath = Object(__WEBPACK_IMPORTED_MODULE_3__lists__["d" /* cons */])(
      Object(__WEBPACK_IMPORTED_MODULE_1__ascent__["b" /* namedNode */])(newDeepestName,
        maybeNewDeepestNode),
      ascent
    )

    emitNodeOpened(ascentWithNewPath)

    return ascentWithNewPath
  }

  /**
    * For when the current node ends.
    */
  function nodeClosed (ascent) {
    emitNodeClosed(ascent)

    return Object(__WEBPACK_IMPORTED_MODULE_3__lists__["l" /* tail */])(ascent) ||
      // If there are no nodes left in the ascent the root node
      // just closed. Emit a special event for this:
      emitRootClosed(Object(__WEBPACK_IMPORTED_MODULE_1__ascent__["c" /* nodeOf */])(Object(__WEBPACK_IMPORTED_MODULE_3__lists__["g" /* head */])(ascent)))
  }

  var contentBuilderHandlers = {}
  contentBuilderHandlers[__WEBPACK_IMPORTED_MODULE_0__events__["l" /* SAX_VALUE_OPEN */]] = nodeOpened
  contentBuilderHandlers[__WEBPACK_IMPORTED_MODULE_0__events__["k" /* SAX_VALUE_CLOSE */]] = nodeClosed
  contentBuilderHandlers[__WEBPACK_IMPORTED_MODULE_0__events__["j" /* SAX_KEY */]] = keyFound
  return contentBuilderHandlers
}




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__publicApi__ = __webpack_require__(5);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__publicApi__["a" /* oboe */]);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return applyDefaults; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);


function applyDefaults (passthrough, url, httpMethodName, body, headers, withCredentials, cached) {
  headers = headers
    // Shallow-clone the headers array. This allows it to be
    // modified without side effects to the caller. We don't
    // want to change objects that the user passes in.
    ? JSON.parse(JSON.stringify(headers))
    : {}

  if (body) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* isString */])(body)) {
      // If the body is not a string, stringify it. This allows objects to
      // be given which will be sent as JSON.
      body = JSON.stringify(body)

      // Default Content-Type to JSON unless given otherwise.
      headers['Content-Type'] = headers['Content-Type'] || 'application/json'
    }
    headers['Content-Length'] = headers['Content-Length'] || body.length
  } else {
    body = null
  }

  // support cache busting like jQuery.ajax({cache:false})
  function modifiedUrl (baseUrl, cached) {
    if (cached === false) {
      if (baseUrl.indexOf('?') === -1) {
        baseUrl += '?'
      } else {
        baseUrl += '&'
      }

      baseUrl += '_=' + new Date().getTime()
    }
    return baseUrl
  }

  return passthrough(httpMethodName || 'GET', modifiedUrl(url, cached), body, headers, withCredentials || false)
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wire; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pubSub__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ascentManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__incrementalContentBuilder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__patternAdapter__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jsonPath__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__instanceApi__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_clarinet__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__streamingHttp_node__ = __webpack_require__(18);










/**
 * This file sits just behind the API which is used to attain a new
 * Oboe instance. It creates the new components that are required
 * and introduces them to each other.
 */

function wire (httpMethodName, contentSource, body, headers, withCredentials) {
  var oboeBus = Object(__WEBPACK_IMPORTED_MODULE_0__pubSub__["a" /* pubSub */])()

  // Wire the input stream in if we are given a content source.
  // This will usually be the case. If not, the instance created
  // will have to be passed content from an external source.

  if (contentSource) {
    Object(__WEBPACK_IMPORTED_MODULE_7__streamingHttp_node__["b" /* streamingHttp */])(oboeBus,
      Object(__WEBPACK_IMPORTED_MODULE_7__streamingHttp_node__["a" /* httpTransport */])(),
      httpMethodName,
      contentSource,
      body,
      headers,
      withCredentials
    )
  }

  Object(__WEBPACK_IMPORTED_MODULE_6__libs_clarinet__["a" /* clarinet */])(oboeBus)

  Object(__WEBPACK_IMPORTED_MODULE_1__ascentManager__["a" /* ascentManager */])(oboeBus, Object(__WEBPACK_IMPORTED_MODULE_2__incrementalContentBuilder__["b" /* incrementalContentBuilder */])(oboeBus))

  Object(__WEBPACK_IMPORTED_MODULE_3__patternAdapter__["a" /* patternAdapter */])(oboeBus, __WEBPACK_IMPORTED_MODULE_4__jsonPath__["a" /* jsonPathCompiler */])

  return Object(__WEBPACK_IMPORTED_MODULE_5__instanceApi__["a" /* instanceApi */])(oboeBus, contentSource)
}




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pubSub; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__singleEventPubSub__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functional__ = __webpack_require__(0);



/**
 * pubSub is a curried interface for listening to and emitting
 * events.
 *
 * If we get a bus:
 *
 *    var bus = pubSub();
 *
 * We can listen to event 'foo' like:
 *
 *    bus('foo').on(myCallback)
 *
 * And emit event foo like:
 *
 *    bus('foo').emit()
 *
 * or, with a parameter:
 *
 *    bus('foo').emit('bar')
 *
 * All functions can be cached and don't need to be
 * bound. Ie:
 *
 *    var fooEmitter = bus('foo').emit
 *    fooEmitter('bar');  // emit an event
 *    fooEmitter('baz');  // emit another
 *
 * There's also an uncurried[1] shortcut for .emit and .on:
 *
 *    bus.on('foo', callback)
 *    bus.emit('foo', 'bar')
 *
 * [1]: http://zvon.org/other/haskell/Outputprelude/uncurry_f.html
 */
function pubSub () {
  var singles = {}
  var newListener = newSingle('newListener')
  var removeListener = newSingle('removeListener')

  function newSingle (eventName) {
    singles[eventName] = Object(__WEBPACK_IMPORTED_MODULE_0__singleEventPubSub__["a" /* singleEventPubSub */])(
      eventName,
      newListener,
      removeListener
    )
    return singles[eventName]
  }

  /** pubSub instances are functions */
  function pubSubInstance (eventName) {
    return singles[eventName] || newSingle(eventName)
  }

  // add convenience EventEmitter-style uncurried form of 'emit' and 'on'
  ['emit', 'on', 'un'].forEach(function (methodName) {
    pubSubInstance[methodName] = Object(__WEBPACK_IMPORTED_MODULE_1__functional__["k" /* varArgs */])(function (eventName, parameters) {
      Object(__WEBPACK_IMPORTED_MODULE_1__functional__["b" /* apply */])(parameters, pubSubInstance(eventName)[methodName])
    })
  })

  return pubSubInstance
}




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return singleEventPubSub; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lists__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functional__ = __webpack_require__(0);




/**
 * A pub/sub which is responsible for a single event type. A
 * multi-event type event bus is created by pubSub by collecting
 * several of these.
 *
 * @param {String} eventType
 *    the name of the events managed by this singleEventPubSub
 * @param {singleEventPubSub} [newListener]
 *    place to notify of new listeners
 * @param {singleEventPubSub} [removeListener]
 *    place to notify of when listeners are removed
 */
function singleEventPubSub (eventType, newListener, removeListener) {
  /** we are optimised for emitting events over firing them.
   *  As well as the tuple list which stores event ids and
   *  listeners there is a list with just the listeners which
   *  can be iterated more quickly when we are emitting
   */
  var listenerTupleList,
    listenerList

  function hasId (id) {
    return function (tuple) {
      return tuple.id === id
    }
  }

  return {

    /**
     * @param {Function} listener
     * @param {*} listenerId
     *    an id that this listener can later by removed by.
     *    Can be of any type, to be compared to other ids using ==
     */
    on: function (listener, listenerId) {
      var tuple = {
        listener: listener,
        id: listenerId || listener // when no id is given use the
        // listener function as the id
      }

      if (newListener) {
        newListener.emit(eventType, listener, tuple.id)
      }

      listenerTupleList = Object(__WEBPACK_IMPORTED_MODULE_0__lists__["d" /* cons */])(tuple, listenerTupleList)
      listenerList = Object(__WEBPACK_IMPORTED_MODULE_0__lists__["d" /* cons */])(listener, listenerList)

      return this // chaining
    },

    emit: function () {
      Object(__WEBPACK_IMPORTED_MODULE_0__lists__["b" /* applyEach */])(listenerList, arguments)
    },

    un: function (listenerId) {
      var removed

      listenerTupleList = Object(__WEBPACK_IMPORTED_MODULE_0__lists__["m" /* without */])(
        listenerTupleList,
        hasId(listenerId),
        function (tuple) {
          removed = tuple
        }
      )

      if (removed) {
        listenerList = Object(__WEBPACK_IMPORTED_MODULE_0__lists__["m" /* without */])(listenerList, function (listener) {
          return listener === removed.listener
        })

        if (removeListener) {
          removeListener.emit(eventType, removed.listener, removed.id)
        }
      }
    },

    listeners: function () {
      // differs from Node EventEmitter: returns list, not array
      return listenerList
    },

    hasListener: function (listenerId) {
      var test = listenerId ? hasId(listenerId) : __WEBPACK_IMPORTED_MODULE_2__functional__["a" /* always */]

      return Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* defined */])(Object(__WEBPACK_IMPORTED_MODULE_0__lists__["e" /* first */])(test, listenerTupleList))
    }
  }
}




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ascentManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lists__ = __webpack_require__(1);



/**
 * A bridge used to assign stateless functions to listen to clarinet.
 *
 * As well as the parameter from clarinet, each callback will also be passed
 * the result of the last callback.
 *
 * This may also be used to clear all listeners by assigning zero handlers:
 *
 *    ascentManager( clarinet, {} )
 */
function ascentManager (oboeBus, handlers) {
  'use strict'

  var listenerId = {}
  var ascent

  function stateAfter (handler) {
    return function (param) {
      ascent = handler(ascent, param)
    }
  }

  for (var eventName in handlers) {
    oboeBus(eventName).on(stateAfter(handlers[eventName]), listenerId)
  }

  oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["g" /* NODE_SWAP */]).on(function (newNode) {
    var oldHead = Object(__WEBPACK_IMPORTED_MODULE_2__lists__["g" /* head */])(ascent)
    var key = Object(__WEBPACK_IMPORTED_MODULE_0__ascent__["a" /* keyOf */])(oldHead)
    var ancestors = Object(__WEBPACK_IMPORTED_MODULE_2__lists__["l" /* tail */])(ascent)
    var parentNode

    if (ancestors) {
      parentNode = Object(__WEBPACK_IMPORTED_MODULE_0__ascent__["c" /* nodeOf */])(Object(__WEBPACK_IMPORTED_MODULE_2__lists__["g" /* head */])(ancestors))
      parentNode[key] = newNode
    }
  })

  oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["e" /* NODE_DROP */]).on(function () {
    var oldHead = Object(__WEBPACK_IMPORTED_MODULE_2__lists__["g" /* head */])(ascent)
    var key = Object(__WEBPACK_IMPORTED_MODULE_0__ascent__["a" /* keyOf */])(oldHead)
    var ancestors = Object(__WEBPACK_IMPORTED_MODULE_2__lists__["l" /* tail */])(ascent)
    var parentNode

    if (ancestors) {
      parentNode = Object(__WEBPACK_IMPORTED_MODULE_0__ascent__["c" /* nodeOf */])(Object(__WEBPACK_IMPORTED_MODULE_2__lists__["g" /* head */])(ancestors))

      delete parentNode[key]
    }
  })

  oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["a" /* ABORTING */]).on(function () {
    for (var eventName in handlers) {
      oboeBus(eventName).un(listenerId)
    }
  })
}




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return patternAdapter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lists__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ascent__ = __webpack_require__(4);




/**
 *  The pattern adaptor listens for newListener and removeListener
 *  events. When patterns are added or removed it compiles the JSONPath
 *  and wires them up.
 *
 *  When nodes and paths are found it emits the fully-qualified match
 *  events with parameters ready to ship to the outside world
 */

function patternAdapter (oboeBus, jsonPathCompiler) {
  var predicateEventMap = {
    node: oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["d" /* NODE_CLOSED */]),
    path: oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["f" /* NODE_OPENED */])
  }

  function emitMatchingNode (emitMatch, node, ascent) {
    /*
         We're now calling to the outside world where Lisp-style
         lists will not be familiar. Convert to standard arrays.

         Also, reverse the order because it is more common to
         list paths "root to leaf" than "leaf to root"  */
    var descent = Object(__WEBPACK_IMPORTED_MODULE_1__lists__["k" /* reverseList */])(ascent)

    emitMatch(
      node,

      // To make a path, strip off the last item which is the special
      // ROOT_PATH token for the 'path' to the root node
      Object(__WEBPACK_IMPORTED_MODULE_1__lists__["i" /* listAsArray */])(Object(__WEBPACK_IMPORTED_MODULE_1__lists__["l" /* tail */])(Object(__WEBPACK_IMPORTED_MODULE_1__lists__["j" /* map */])(__WEBPACK_IMPORTED_MODULE_2__ascent__["a" /* keyOf */], descent))), // path
      Object(__WEBPACK_IMPORTED_MODULE_1__lists__["i" /* listAsArray */])(Object(__WEBPACK_IMPORTED_MODULE_1__lists__["j" /* map */])(__WEBPACK_IMPORTED_MODULE_2__ascent__["c" /* nodeOf */], descent)) // ancestors
    )
  }

  /*
    * Set up the catching of events such as NODE_CLOSED and NODE_OPENED and, if
    * matching the specified pattern, propagate to pattern-match events such as
    * oboeBus('node:!')
    *
    *
    *
    * @param {Function} predicateEvent
    *          either oboeBus(NODE_CLOSED) or oboeBus(NODE_OPENED).
    * @param {Function} compiledJsonPath
    */
  function addUnderlyingListener (fullEventName, predicateEvent, compiledJsonPath) {
    var emitMatch = oboeBus(fullEventName).emit

    predicateEvent.on(function (ascent) {
      var maybeMatchingMapping = compiledJsonPath(ascent)

      /* Possible values for maybeMatchingMapping are now:

          false:
          we did not match

          an object/array/string/number/null:
          we matched and have the node that matched.
          Because nulls are valid json values this can be null.

          undefined:
          we matched but don't have the matching node yet.
          ie, we know there is an upcoming node that matches but we
          can't say anything else about it.
          */
      if (maybeMatchingMapping !== false) {
        emitMatchingNode(
          emitMatch,
          Object(__WEBPACK_IMPORTED_MODULE_2__ascent__["c" /* nodeOf */])(maybeMatchingMapping),
          ascent
        )
      }
    }, fullEventName)

    oboeBus('removeListener').on(function (removedEventName) {
      // if the fully qualified match event listener is later removed, clean up
      // by removing the underlying listener if it was the last using that pattern:

      if (removedEventName === fullEventName) {
        if (!oboeBus(removedEventName).listeners()) {
          predicateEvent.un(fullEventName)
        }
      }
    })
  }

  oboeBus('newListener').on(function (fullEventName) {
    var match = /(node|path):(.*)/.exec(fullEventName)

    if (match) {
      var predicateEvent = predicateEventMap[match[1]]

      if (!predicateEvent.hasListener(fullEventName)) {
        addUnderlyingListener(
          fullEventName,
          predicateEvent,
          jsonPathCompiler(match[2])
        )
      }
    }
  })
}




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return jsonPathCompiler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functional__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lists__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ascent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__incrementalContentBuilder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__jsonPathSyntax__ = __webpack_require__(15);







/**
 * The jsonPath evaluator compiler used for Oboe.js.
 *
 * One function is exposed. This function takes a String JSONPath spec and
 * returns a function to test candidate ascents for matches.
 *
 *  String jsonPath -> (List ascent) -> Boolean|Object
 *
 * This file is coded in a pure functional style. That is, no function has
 * side effects, every function evaluates to the same value for the same
 * arguments and no variables are reassigned.
 */
// the call to jsonPathSyntax injects the token syntaxes that are needed
// inside the compiler
var jsonPathCompiler = Object(__WEBPACK_IMPORTED_MODULE_5__jsonPathSyntax__["a" /* jsonPathSyntax */])(function (pathNodeSyntax,
  doubleDotSyntax,
  dotSyntax,
  bangSyntax,
  emptySyntax) {
  var CAPTURING_INDEX = 1
  var NAME_INDEX = 2
  var FIELD_LIST_INDEX = 3

  var headKey = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["d" /* compose2 */])(__WEBPACK_IMPORTED_MODULE_2__ascent__["a" /* keyOf */], __WEBPACK_IMPORTED_MODULE_1__lists__["g" /* head */])
  var headNode = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["d" /* compose2 */])(__WEBPACK_IMPORTED_MODULE_2__ascent__["c" /* nodeOf */], __WEBPACK_IMPORTED_MODULE_1__lists__["g" /* head */])

  /**
    * Create an evaluator function for a named path node, expressed in the
    * JSONPath like:
    *    foo
    *    ["bar"]
    *    [2]
    */
  function nameClause (previousExpr, detection) {
    var name = detection[NAME_INDEX]

    var matchesName = (!name || name === '*')
      ? __WEBPACK_IMPORTED_MODULE_0__functional__["a" /* always */]
      : function (ascent) { return String(headKey(ascent)) === name }

    return Object(__WEBPACK_IMPORTED_MODULE_0__functional__["g" /* lazyIntersection */])(matchesName, previousExpr)
  }

  /**
    * Create an evaluator function for a a duck-typed node, expressed like:
    *
    *    {spin, taste, colour}
    *    .particle{spin, taste, colour}
    *    *{spin, taste, colour}
    */
  function duckTypeClause (previousExpr, detection) {
    var fieldListStr = detection[FIELD_LIST_INDEX]

    if (!fieldListStr) { return previousExpr } // don't wrap at all, return given expr as-is

    var hasAllrequiredFields = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["j" /* partialComplete */])(
      __WEBPACK_IMPORTED_MODULE_3__util__["b" /* hasAllProperties */],
      Object(__WEBPACK_IMPORTED_MODULE_1__lists__["c" /* arrayAsList */])(fieldListStr.split(/\W+/))
    )

    var isMatch = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["d" /* compose2 */])(
      hasAllrequiredFields,
      headNode
    )

    return Object(__WEBPACK_IMPORTED_MODULE_0__functional__["g" /* lazyIntersection */])(isMatch, previousExpr)
  }

  /**
    * Expression for $, returns the evaluator function
    */
  function capture (previousExpr, detection) {
    // extract meaning from the detection
    var capturing = !!detection[CAPTURING_INDEX]

    if (!capturing) { return previousExpr } // don't wrap at all, return given expr as-is

    return Object(__WEBPACK_IMPORTED_MODULE_0__functional__["g" /* lazyIntersection */])(previousExpr, __WEBPACK_IMPORTED_MODULE_1__lists__["g" /* head */])
  }

  /**
    * Create an evaluator function that moves onto the next item on the
    * lists. This function is the place where the logic to move up a
    * level in the ascent exists.
    *
    * Eg, for JSONPath ".foo" we need skip1(nameClause(always, [,'foo']))
    */
  function skip1 (previousExpr) {
    if (previousExpr === __WEBPACK_IMPORTED_MODULE_0__functional__["a" /* always */]) {
      /* If there is no previous expression this consume command
            is at the start of the jsonPath.
            Since JSONPath specifies what we'd like to find but not
            necessarily everything leading down to it, when running
            out of JSONPath to check against we default to true */
      return __WEBPACK_IMPORTED_MODULE_0__functional__["a" /* always */]
    }

    /** return true if the ascent we have contains only the JSON root,
       *  false otherwise
       */
    function notAtRoot (ascent) {
      return headKey(ascent) !== __WEBPACK_IMPORTED_MODULE_4__incrementalContentBuilder__["a" /* ROOT_PATH */]
    }

    return Object(__WEBPACK_IMPORTED_MODULE_0__functional__["g" /* lazyIntersection */])(
      /* If we're already at the root but there are more
                  expressions to satisfy, can't consume any more. No match.

                  This check is why none of the other exprs have to be able
                  to handle empty lists; skip1 is the only evaluator that
                  moves onto the next token and it refuses to do so once it
                  reaches the last item in the list. */
      notAtRoot,

      /* We are not at the root of the ascent yet.
                  Move to the next level of the ascent by handing only
                  the tail to the previous expression */
      Object(__WEBPACK_IMPORTED_MODULE_0__functional__["d" /* compose2 */])(previousExpr, __WEBPACK_IMPORTED_MODULE_1__lists__["l" /* tail */])
    )
  }

  /**
    * Create an evaluator function for the .. (double dot) token. Consumes
    * zero or more levels of the ascent, the fewest that are required to find
    * a match when given to previousExpr.
    */
  function skipMany (previousExpr) {
    if (previousExpr === __WEBPACK_IMPORTED_MODULE_0__functional__["a" /* always */]) {
      /* If there is no previous expression this consume command
            is at the start of the jsonPath.
            Since JSONPath specifies what we'd like to find but not
            necessarily everything leading down to it, when running
            out of JSONPath to check against we default to true */
      return __WEBPACK_IMPORTED_MODULE_0__functional__["a" /* always */]
    }

    // In JSONPath .. is equivalent to !.. so if .. reaches the root
    // the match has succeeded. Ie, we might write ..foo or !..foo
    // and both should match identically.
    var terminalCaseWhenArrivingAtRoot = rootExpr()
    var terminalCaseWhenPreviousExpressionIsSatisfied = previousExpr
    var recursiveCase = skip1(function (ascent) {
      return cases(ascent)
    })

    var cases = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["h" /* lazyUnion */])(
      terminalCaseWhenArrivingAtRoot
      , terminalCaseWhenPreviousExpressionIsSatisfied
      , recursiveCase
    )

    return cases
  }

  /**
    * Generate an evaluator for ! - matches only the root element of the json
    * and ignores any previous expressions since nothing may precede !.
    */
  function rootExpr () {
    return function (ascent) {
      return headKey(ascent) === __WEBPACK_IMPORTED_MODULE_4__incrementalContentBuilder__["a" /* ROOT_PATH */]
    }
  }

  /**
    * Generate a statement wrapper to sit around the outermost
    * clause evaluator.
    *
    * Handles the case where the capturing is implicit because the JSONPath
    * did not contain a '$' by returning the last node.
    */
  function statementExpr (lastClause) {
    return function (ascent) {
      // kick off the evaluation by passing through to the last clause
      var exprMatch = lastClause(ascent)

      return exprMatch === true ? Object(__WEBPACK_IMPORTED_MODULE_1__lists__["g" /* head */])(ascent) : exprMatch
    }
  }

  /**
    * For when a token has been found in the JSONPath input.
    * Compiles the parser for that token and returns in combination with the
    * parser already generated.
    *
    * @param {Function} exprs  a list of the clause evaluator generators for
    *                          the token that was found
    * @param {Function} parserGeneratedSoFar the parser already found
    * @param {Array} detection the match given by the regex engine when
    *                          the feature was found
    */
  function expressionsReader (exprs, parserGeneratedSoFar, detection) {
    // if exprs is zero-length foldR will pass back the
    // parserGeneratedSoFar as-is so we don't need to treat
    // this as a special case

    return Object(__WEBPACK_IMPORTED_MODULE_1__lists__["f" /* foldR */])(
      function (parserGeneratedSoFar, expr) {
        return expr(parserGeneratedSoFar, detection)
      },
      parserGeneratedSoFar,
      exprs
    )
  }

  /**
    *  If jsonPath matches the given detector function, creates a function which
    *  evaluates against every clause in the clauseEvaluatorGenerators. The
    *  created function is propagated to the onSuccess function, along with
    *  the remaining unparsed JSONPath substring.
    *
    *  The intended use is to create a clauseMatcher by filling in
    *  the first two arguments, thus providing a function that knows
    *  some syntax to match and what kind of generator to create if it
    *  finds it. The parameter list once completed is:
    *
    *    (jsonPath, parserGeneratedSoFar, onSuccess)
    *
    *  onSuccess may be compileJsonPathToFunction, to recursively continue
    *  parsing after finding a match or returnFoundParser to stop here.
    */
  function generateClauseReaderIfTokenFound (

    tokenDetector, clauseEvaluatorGenerators,

    jsonPath, parserGeneratedSoFar, onSuccess) {
    var detected = tokenDetector(jsonPath)

    if (detected) {
      var compiledParser = expressionsReader(
        clauseEvaluatorGenerators,
        parserGeneratedSoFar,
        detected
      )

      var remainingUnparsedJsonPath = jsonPath.substr(Object(__WEBPACK_IMPORTED_MODULE_3__util__["e" /* len */])(detected[0]))

      return onSuccess(remainingUnparsedJsonPath, compiledParser)
    }
  }

  /**
    * Partially completes generateClauseReaderIfTokenFound above.
    */
  function clauseMatcher (tokenDetector, exprs) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__functional__["j" /* partialComplete */])(
      generateClauseReaderIfTokenFound,
      tokenDetector,
      exprs
    )
  }

  /**
    * clauseForJsonPath is a function which attempts to match against
    * several clause matchers in order until one matches. If non match the
    * jsonPath expression is invalid and an error is thrown.
    *
    * The parameter list is the same as a single clauseMatcher:
    *
    *    (jsonPath, parserGeneratedSoFar, onSuccess)
    */
  var clauseForJsonPath = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["h" /* lazyUnion */])(

    clauseMatcher(pathNodeSyntax, Object(__WEBPACK_IMPORTED_MODULE_1__lists__["h" /* list */])(capture,
      duckTypeClause,
      nameClause,
      skip1))

    , clauseMatcher(doubleDotSyntax, Object(__WEBPACK_IMPORTED_MODULE_1__lists__["h" /* list */])(skipMany))

    // dot is a separator only (like whitespace in other languages) but
    // rather than make it a special case, use an empty list of
    // expressions when this token is found
    , clauseMatcher(dotSyntax, Object(__WEBPACK_IMPORTED_MODULE_1__lists__["h" /* list */])())

    , clauseMatcher(bangSyntax, Object(__WEBPACK_IMPORTED_MODULE_1__lists__["h" /* list */])(capture,
      rootExpr))

    , clauseMatcher(emptySyntax, Object(__WEBPACK_IMPORTED_MODULE_1__lists__["h" /* list */])(statementExpr))

    , function (jsonPath) {
      throw Error('"' + jsonPath + '" could not be tokenised')
    }
  )

  /**
    * One of two possible values for the onSuccess argument of
    * generateClauseReaderIfTokenFound.
    *
    * When this function is used, generateClauseReaderIfTokenFound simply
    * returns the compiledParser that it made, regardless of if there is
    * any remaining jsonPath to be compiled.
    */
  function returnFoundParser (_remainingJsonPath, compiledParser) {
    return compiledParser
  }

  /**
    * Recursively compile a JSONPath expression.
    *
    * This function serves as one of two possible values for the onSuccess
    * argument of generateClauseReaderIfTokenFound, meaning continue to
    * recursively compile. Otherwise, returnFoundParser is given and
    * compilation terminates.
    */
  function compileJsonPathToFunction (uncompiledJsonPath,
    parserGeneratedSoFar) {
    /**
       * On finding a match, if there is remaining text to be compiled
       * we want to either continue parsing using a recursive call to
       * compileJsonPathToFunction. Otherwise, we want to stop and return
       * the parser that we have found so far.
       */
    var onFind = uncompiledJsonPath
      ? compileJsonPathToFunction
      : returnFoundParser

    return clauseForJsonPath(
      uncompiledJsonPath,
      parserGeneratedSoFar,
      onFind
    )
  }

  /**
    * This is the function that we expose to the rest of the library.
    */
  return function (jsonPath) {
    try {
      // Kick off the recursive parsing of the jsonPath
      return compileJsonPathToFunction(jsonPath, __WEBPACK_IMPORTED_MODULE_0__functional__["a" /* always */])
    } catch (e) {
      throw Error('Could not compile "' + jsonPath +
        '" because ' + e.message
      )
    }
  }
})




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return jsonPathSyntax; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functional__ = __webpack_require__(0);


var jsonPathSyntax = (function () {
  /**
  * Export a regular expression as a simple function by exposing just
  * the Regex#exec. This allows regex tests to be used under the same
  * interface as differently implemented tests, or for a user of the
  * tests to not concern themselves with their implementation as regular
  * expressions.
  *
  * This could also be expressed point-free as:
  *   Function.prototype.bind.bind(RegExp.prototype.exec),
  *
  * But that's far too confusing! (and not even smaller once minified
  * and gzipped)
  */
  var regexDescriptor = function regexDescriptor (regex) {
    return regex.exec.bind(regex)
  }

  /**
  * Join several regular expressions and express as a function.
  * This allows the token patterns to reuse component regular expressions
  * instead of being expressed in full using huge and confusing regular
  * expressions.
  */
  var jsonPathClause = Object(__WEBPACK_IMPORTED_MODULE_0__functional__["k" /* varArgs */])(function (componentRegexes) {
    // The regular expressions all start with ^ because we
    // only want to find matches at the start of the
    // JSONPath fragment we are inspecting
    componentRegexes.unshift(/^/)

    return regexDescriptor(
      RegExp(
        componentRegexes.map(Object(__WEBPACK_IMPORTED_MODULE_0__functional__["c" /* attr */])('source')).join('')
      )
    )
  })

  var possiblyCapturing = /(\$?)/
  var namedNode = /([\w-_]+|\*)/
  var namePlaceholder = /()/
  var nodeInArrayNotation = /\["([^"]+)"\]/
  var numberedNodeInArrayNotation = /\[(\d+|\*)\]/
  var fieldList = /{([\w ]*?)}/
  var optionalFieldList = /(?:{([\w ]*?)})?/

  //   foo or *
  var jsonPathNamedNodeInObjectNotation = jsonPathClause(
    possiblyCapturing,
    namedNode,
    optionalFieldList
  )

  //   ["foo"]
  var jsonPathNamedNodeInArrayNotation = jsonPathClause(
    possiblyCapturing,
    nodeInArrayNotation,
    optionalFieldList
  )

  //   [2] or [*]
  var jsonPathNumberedNodeInArrayNotation = jsonPathClause(
    possiblyCapturing,
    numberedNodeInArrayNotation,
    optionalFieldList
  )

  //   {a b c}
  var jsonPathPureDuckTyping = jsonPathClause(
    possiblyCapturing,
    namePlaceholder,
    fieldList
  )

  //   ..
  var jsonPathDoubleDot = jsonPathClause(/\.\./)

  //   .
  var jsonPathDot = jsonPathClause(/\./)

  //   !
  var jsonPathBang = jsonPathClause(
    possiblyCapturing,
    /!/
  )

  //   nada!
  var emptyString = jsonPathClause(/$/)

  /* We export only a single function. When called, this function injects
      into another function the descriptors from above.
    */
  return function (fn) {
    return fn(
      Object(__WEBPACK_IMPORTED_MODULE_0__functional__["h" /* lazyUnion */])(
        jsonPathNamedNodeInObjectNotation
        , jsonPathNamedNodeInArrayNotation
        , jsonPathNumberedNodeInArrayNotation
        , jsonPathPureDuckTyping
      )
      , jsonPathDoubleDot
      , jsonPathDot
      , jsonPathBang
      , emptyString
    )
  }
}())




/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return instanceApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functional__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__publicApi__ = __webpack_require__(5);





/**
 * The instance API is the thing that is returned when oboe() is called.
 * it allows:
 *
 *    - listeners for various events to be added and removed
 *    - the http response header/headers to be read
 */
function instanceApi (oboeBus, contentSource) {
  var oboeApi
  var fullyQualifiedNamePattern = /^(node|path):./
  var rootNodeFinishedEvent = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["h" /* ROOT_NODE_FOUND */])
  var emitNodeDrop = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["e" /* NODE_DROP */]).emit
  var emitNodeSwap = oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["g" /* NODE_SWAP */]).emit

  /**
       * Add any kind of listener that the instance api exposes
       */
  var addListener = Object(__WEBPACK_IMPORTED_MODULE_1__functional__["k" /* varArgs */])(function (eventId, parameters) {
    if (oboeApi[eventId]) {
      // for events added as .on(event, callback), if there is a
      // .event() equivalent with special behaviour , pass through
      // to that:
      Object(__WEBPACK_IMPORTED_MODULE_1__functional__["b" /* apply */])(parameters, oboeApi[eventId])
    } else {
      // we have a standard Node.js EventEmitter 2-argument call.
      // The first parameter is the listener.
      var event = oboeBus(eventId)
      var listener = parameters[0]

      if (fullyQualifiedNamePattern.test(eventId)) {
        // allow fully-qualified node/path listeners
        // to be added
        addForgettableCallback(event, wrapCallbackToSwapNodeIfSomethingReturned(listener))
      } else {
        // the event has no special handling, pass through
        // directly onto the event bus:
        event.on(listener)
      }
    }

    return oboeApi // chaining
  })

  /**
       * Remove any kind of listener that the instance api exposes
       */
  var removeListener = function (eventId, p2, p3) {
    if (eventId === 'done') {
      rootNodeFinishedEvent.un(p2)
    } else if (eventId === 'node' || eventId === 'path') {
      // allow removal of node and path
      oboeBus.un(eventId + ':' + p2, p3)
    } else {
      // we have a standard Node.js EventEmitter 2-argument call.
      // The second parameter is the listener. This may be a call
      // to remove a fully-qualified node/path listener but requires
      // no special handling
      var listener = p2

      oboeBus(eventId).un(listener)
    }

    return oboeApi // chaining
  }

  /**
   * Add a callback, wrapped in a try/catch so as to not break the
   * execution of Oboe if an exception is thrown (fail events are
   * fired instead)
   *
   * The callback is used as the listener id so that it can later be
   * removed using .un(callback)
   */
  function addProtectedCallback (eventName, callback) {
    oboeBus(eventName).on(protectedCallback(callback), callback)
    return oboeApi // chaining
  }

  /**
   * Add a callback where, if .forget() is called during the callback's
   * execution, the callback will be de-registered
   */
  function addForgettableCallback (event, callback, listenerId) {
    // listenerId is optional and if not given, the original
    // callback will be used
    listenerId = listenerId || callback

    var safeCallback = protectedCallback(callback)

    event.on(function () {
      var discard = false

      oboeApi.forget = function () {
        discard = true
      }

      Object(__WEBPACK_IMPORTED_MODULE_1__functional__["b" /* apply */])(arguments, safeCallback)

      delete oboeApi.forget

      if (discard) {
        event.un(listenerId)
      }
    }, listenerId)

    return oboeApi // chaining
  }

  /**
   *  wrap a callback so that if it throws, Oboe.js doesn't crash but instead
   *  throw the error in another event loop
   */
  function protectedCallback (callback) {
    return function () {
      try {
        return callback.apply(oboeApi, arguments)
      } catch (e) {
        setTimeout(function () {
          throw new Error(e.message)
        })
      }
    }
  }

  /**
   * Return the fully qualified event for when a pattern matches
   * either a node or a path
   *
   * @param type {String} either 'node' or 'path'
   */
  function fullyQualifiedPatternMatchEvent (type, pattern) {
    return oboeBus(type + ':' + pattern)
  }

  function wrapCallbackToSwapNodeIfSomethingReturned (callback) {
    return function () {
      var returnValueFromCallback = callback.apply(this, arguments)

      if (Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* defined */])(returnValueFromCallback)) {
        if (returnValueFromCallback === __WEBPACK_IMPORTED_MODULE_3__publicApi__["a" /* oboe */].drop) {
          emitNodeDrop()
        } else {
          emitNodeSwap(returnValueFromCallback)
        }
      }
    }
  }

  function addSingleNodeOrPathListener (eventId, pattern, callback) {
    var effectiveCallback

    if (eventId === 'node') {
      effectiveCallback = wrapCallbackToSwapNodeIfSomethingReturned(callback)
    } else {
      effectiveCallback = callback
    }

    addForgettableCallback(
      fullyQualifiedPatternMatchEvent(eventId, pattern),
      effectiveCallback,
      callback
    )
  }

  /**
   * Add several listeners at a time, from a map
   */
  function addMultipleNodeOrPathListeners (eventId, listenerMap) {
    for (var pattern in listenerMap) {
      addSingleNodeOrPathListener(eventId, pattern, listenerMap[pattern])
    }
  }

  /**
   * implementation behind .onPath() and .onNode()
   */
  function addNodeOrPathListenerApi (eventId, jsonPathOrListenerMap, callback) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* isString */])(jsonPathOrListenerMap)) {
      addSingleNodeOrPathListener(eventId, jsonPathOrListenerMap, callback)
    } else {
      addMultipleNodeOrPathListeners(eventId, jsonPathOrListenerMap)
    }

    return oboeApi // chaining
  }

  // some interface methods are only filled in after we receive
  // values and are noops before that:
  oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["i" /* ROOT_PATH_FOUND */]).on(function (rootNode) {
    oboeApi.root = Object(__WEBPACK_IMPORTED_MODULE_1__functional__["f" /* functor */])(rootNode)
  })

  /**
   * When content starts make the headers readable through the
   * instance API
   */
  oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["c" /* HTTP_START */]).on(function (_statusCode, headers) {
    oboeApi.header = function (name) {
      return name ? headers[name]
        : headers
    }
  })

  /**
   * Construct and return the public API of the Oboe instance to be
   * returned to the calling application
   */
  oboeApi = {
    on: addListener,
    addListener: addListener,
    removeListener: removeListener,
    emit: oboeBus.emit,

    node: Object(__WEBPACK_IMPORTED_MODULE_1__functional__["j" /* partialComplete */])(addNodeOrPathListenerApi, 'node'),
    path: Object(__WEBPACK_IMPORTED_MODULE_1__functional__["j" /* partialComplete */])(addNodeOrPathListenerApi, 'path'),

    done: Object(__WEBPACK_IMPORTED_MODULE_1__functional__["j" /* partialComplete */])(addForgettableCallback, rootNodeFinishedEvent),
    start: Object(__WEBPACK_IMPORTED_MODULE_1__functional__["j" /* partialComplete */])(addProtectedCallback, __WEBPACK_IMPORTED_MODULE_0__events__["c" /* HTTP_START */]),

    // fail doesn't use protectedCallback because
    // could lead to non-terminating loops
    fail: oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["b" /* FAIL_EVENT */]).on,

    // public api calling abort fires the ABORTING event
    abort: oboeBus(__WEBPACK_IMPORTED_MODULE_0__events__["a" /* ABORTING */]).emit,

    // initially return nothing for header and root
    header: __WEBPACK_IMPORTED_MODULE_1__functional__["i" /* noop */],
    root: __WEBPACK_IMPORTED_MODULE_1__functional__["i" /* noop */],

    source: contentSource
  }

  return oboeApi
}




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clarinet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(3);


/*
   This is a slightly hacked-up browser only version of clarinet

      *  some features removed to help keep browser Oboe under
         the 5k micro-library limit
      *  plug directly into event bus

   For the original go here:
      https://github.com/dscape/clarinet

   We receive the events:
      STREAM_DATA
      STREAM_END

   We emit the events:
      SAX_KEY
      SAX_VALUE_OPEN
      SAX_VALUE_CLOSE
      FAIL_EVENT
 */

function clarinet (eventBus) {
  'use strict'

  // shortcut some events on the bus
  var emitSaxKey = eventBus(__WEBPACK_IMPORTED_MODULE_0__events__["j" /* SAX_KEY */]).emit
  var emitValueOpen = eventBus(__WEBPACK_IMPORTED_MODULE_0__events__["l" /* SAX_VALUE_OPEN */]).emit
  var emitValueClose = eventBus(__WEBPACK_IMPORTED_MODULE_0__events__["k" /* SAX_VALUE_CLOSE */]).emit
  var emitFail = eventBus(__WEBPACK_IMPORTED_MODULE_0__events__["b" /* FAIL_EVENT */]).emit

  var MAX_BUFFER_LENGTH = 64 * 1024
  var stringTokenPattern = /[\\"\n]/g
  var _n = 0

  // states
  var BEGIN = _n++
  var VALUE = _n++ // general stuff
  var OPEN_OBJECT = _n++ // {
  var CLOSE_OBJECT = _n++ // }
  var OPEN_ARRAY = _n++ // [
  var CLOSE_ARRAY = _n++ // ]
  var STRING = _n++ // ""
  var OPEN_KEY = _n++ // , "a"
  var CLOSE_KEY = _n++ // :
  var TRUE = _n++ // r
  var TRUE2 = _n++ // u
  var TRUE3 = _n++ // e
  var FALSE = _n++ // a
  var FALSE2 = _n++ // l
  var FALSE3 = _n++ // s
  var FALSE4 = _n++ // e
  var NULL = _n++ // u
  var NULL2 = _n++ // l
  var NULL3 = _n++ // l
  var NUMBER_DECIMAL_POINT = _n++ // .
  var NUMBER_DIGIT = _n // [0-9]

  // setup initial parser values
  var bufferCheckPosition = MAX_BUFFER_LENGTH
  var latestError
  var c
  var p
  var textNode
  var numberNode = ''
  var slashed = false
  var closed = false
  var state = BEGIN
  var stack = []
  var unicodeS = null
  var unicodeI = 0
  var depth = 0
  var position = 0
  var column = 0 // mostly for error reporting
  var line = 1

  function checkBufferLength () {
    var maxActual = 0

    if (textNode !== undefined && textNode.length > MAX_BUFFER_LENGTH) {
      emitError('Max buffer length exceeded: textNode')
      maxActual = Math.max(maxActual, textNode.length)
    }
    if (numberNode.length > MAX_BUFFER_LENGTH) {
      emitError('Max buffer length exceeded: numberNode')
      maxActual = Math.max(maxActual, numberNode.length)
    }

    bufferCheckPosition = (MAX_BUFFER_LENGTH - maxActual) +
      position
  }

  eventBus(__WEBPACK_IMPORTED_MODULE_0__events__["m" /* STREAM_DATA */]).on(handleData)

  /* At the end of the http content close the clarinet
    This will provide an error if the total content provided was not
    valid json, ie if not all arrays, objects and Strings closed properly */
  eventBus(__WEBPACK_IMPORTED_MODULE_0__events__["n" /* STREAM_END */]).on(handleStreamEnd)

  function emitError (errorString) {
    if (textNode !== undefined) {
      emitValueOpen(textNode)
      emitValueClose()
      textNode = undefined
    }

    latestError = Error(errorString + '\nLn: ' + line +
      '\nCol: ' + column +
      '\nChr: ' + c)

    emitFail(Object(__WEBPACK_IMPORTED_MODULE_0__events__["o" /* errorReport */])(undefined, undefined, latestError))
  }

  function handleStreamEnd () {
    if (state === BEGIN) {
      // Handle the case where the stream closes without ever receiving
      // any input. This isn't an error - response bodies can be blank,
      // particularly for 204 http responses

      // Because of how Oboe is currently implemented, we parse a
      // completely empty stream as containing an empty object.
      // This is because Oboe's done event is only fired when the
      // root object of the JSON stream closes.

      // This should be decoupled and attached instead to the input stream
      // from the http (or whatever) resource ending.
      // If this decoupling could happen the SAX parser could simply emit
      // zero events on a completely empty input.
      emitValueOpen({})
      emitValueClose()

      closed = true
      return
    }

    if (state !== VALUE || depth !== 0) { emitError('Unexpected end') }

    if (textNode !== undefined) {
      emitValueOpen(textNode)
      emitValueClose()
      textNode = undefined
    }

    closed = true
  }

  function whitespace (c) {
    return c === '\r' || c === '\n' || c === ' ' || c === '\t'
  }

  function handleData (chunk) {
    // this used to throw the error but inside Oboe we will have already
    // gotten the error when it was emitted. The important thing is to
    // not continue with the parse.
    if (latestError) { return }

    if (closed) {
      return emitError('Cannot write after close')
    }

    var i = 0
    c = chunk[0]

    while (c) {
      if (i > 0) {
        p = c
      }
      c = chunk[i++]
      if (!c) break

      position++
      if (c === '\n') {
        line++
        column = 0
      } else column++
      switch (state) {
        case BEGIN:
          if (c === '{') state = OPEN_OBJECT
          else if (c === '[') state = OPEN_ARRAY
          else if (!whitespace(c)) { return emitError('Non-whitespace before {[.') }
          continue

        case OPEN_KEY:
        case OPEN_OBJECT:
          if (whitespace(c)) continue
          if (state === OPEN_KEY) stack.push(CLOSE_KEY)
          else {
            if (c === '}') {
              emitValueOpen({})
              emitValueClose()
              state = stack.pop() || VALUE
              continue
            } else stack.push(CLOSE_OBJECT)
          }
          if (c === '"') { state = STRING } else { return emitError('Malformed object key should start with " ') }
          continue

        case CLOSE_KEY:
        case CLOSE_OBJECT:
          if (whitespace(c)) continue

          if (c === ':') {
            if (state === CLOSE_OBJECT) {
              stack.push(CLOSE_OBJECT)

              if (textNode !== undefined) {
                // was previously (in upstream Clarinet) one event
                //  - object open came with the text of the first
                emitValueOpen({})
                emitSaxKey(textNode)
                textNode = undefined
              }
              depth++
            } else {
              if (textNode !== undefined) {
                emitSaxKey(textNode)
                textNode = undefined
              }
            }
            state = VALUE
          } else if (c === '}') {
            if (textNode !== undefined) {
              emitValueOpen(textNode)
              emitValueClose()
              textNode = undefined
            }
            emitValueClose()
            depth--
            state = stack.pop() || VALUE
          } else if (c === ',') {
            if (state === CLOSE_OBJECT) { stack.push(CLOSE_OBJECT) }
            if (textNode !== undefined) {
              emitValueOpen(textNode)
              emitValueClose()
              textNode = undefined
            }
            state = OPEN_KEY
          } else { return emitError('Bad object') }
          continue

        case OPEN_ARRAY: // after an array there always a value
        case VALUE:
          if (whitespace(c)) continue
          if (state === OPEN_ARRAY) {
            emitValueOpen([])
            depth++
            state = VALUE
            if (c === ']') {
              emitValueClose()
              depth--
              state = stack.pop() || VALUE
              continue
            } else {
              stack.push(CLOSE_ARRAY)
            }
          }
          if (c === '"') state = STRING
          else if (c === '{') state = OPEN_OBJECT
          else if (c === '[') state = OPEN_ARRAY
          else if (c === 't') state = TRUE
          else if (c === 'f') state = FALSE
          else if (c === 'n') state = NULL
          else if (c === '-') { // keep and continue
            numberNode += c
          } else if (c === '0') {
            numberNode += c
            state = NUMBER_DIGIT
          } else if ('123456789'.indexOf(c) !== -1) {
            numberNode += c
            state = NUMBER_DIGIT
          } else { return emitError('Bad value') }
          continue

        case CLOSE_ARRAY:
          if (c === ',') {
            stack.push(CLOSE_ARRAY)
            if (textNode !== undefined) {
              emitValueOpen(textNode)
              emitValueClose()
              textNode = undefined
            }
            state = VALUE
          } else if (c === ']') {
            if (textNode !== undefined) {
              emitValueOpen(textNode)
              emitValueClose()
              textNode = undefined
            }
            emitValueClose()
            depth--
            state = stack.pop() || VALUE
          } else if (whitespace(c)) { continue } else { return emitError('Bad array') }
          continue

        case STRING:
          if (textNode === undefined) {
            textNode = ''
          }

          // thanks thejh, this is an about 50% performance improvement.
          var starti = i - 1

          // eslint-disable-next-line no-labels
          STRING_BIGLOOP: while (true) {
            // zero means "no unicode active". 1-4 mean "parse some more". end after 4.
            while (unicodeI > 0) {
              unicodeS += c
              c = chunk.charAt(i++)
              if (unicodeI === 4) {
                // TODO this might be slow? well, probably not used too often anyway
                textNode += String.fromCharCode(parseInt(unicodeS, 16))
                unicodeI = 0
                starti = i - 1
              } else {
                unicodeI++
              }
              // we can just break here: no stuff we skipped that still has to be sliced out or so
              // eslint-disable-next-line no-labels
              if (!c) break STRING_BIGLOOP
            }
            if (c === '"' && !slashed) {
              state = stack.pop() || VALUE
              textNode += chunk.substring(starti, i - 1)
              break
            }
            if (c === '\\' && !slashed) {
              slashed = true
              textNode += chunk.substring(starti, i - 1)
              c = chunk.charAt(i++)
              if (!c) break
            }
            if (slashed) {
              slashed = false
              if (c === 'n') { textNode += '\n' } else if (c === 'r') { textNode += '\r' } else if (c === 't') { textNode += '\t' } else if (c === 'f') { textNode += '\f' } else if (c === 'b') { textNode += '\b' } else if (c === 'u') {
                // \uxxxx. meh!
                unicodeI = 1
                unicodeS = ''
              } else {
                textNode += c
              }
              c = chunk.charAt(i++)
              starti = i - 1
              if (!c) break
              else continue
            }

            stringTokenPattern.lastIndex = i
            var reResult = stringTokenPattern.exec(chunk)
            if (!reResult) {
              i = chunk.length + 1
              textNode += chunk.substring(starti, i - 1)
              break
            }
            i = reResult.index + 1
            c = chunk.charAt(reResult.index)
            if (!c) {
              textNode += chunk.substring(starti, i - 1)
              break
            }
          }
          continue

        case TRUE:
          if (!c) continue // strange buffers
          if (c === 'r') state = TRUE2
          else { return emitError('Invalid true started with t' + c) }
          continue

        case TRUE2:
          if (!c) continue
          if (c === 'u') state = TRUE3
          else { return emitError('Invalid true started with tr' + c) }
          continue

        case TRUE3:
          if (!c) continue
          if (c === 'e') {
            emitValueOpen(true)
            emitValueClose()
            state = stack.pop() || VALUE
          } else { return emitError('Invalid true started with tru' + c) }
          continue

        case FALSE:
          if (!c) continue
          if (c === 'a') state = FALSE2
          else { return emitError('Invalid false started with f' + c) }
          continue

        case FALSE2:
          if (!c) continue
          if (c === 'l') state = FALSE3
          else { return emitError('Invalid false started with fa' + c) }
          continue

        case FALSE3:
          if (!c) continue
          if (c === 's') state = FALSE4
          else { return emitError('Invalid false started with fal' + c) }
          continue

        case FALSE4:
          if (!c) continue
          if (c === 'e') {
            emitValueOpen(false)
            emitValueClose()
            state = stack.pop() || VALUE
          } else { return emitError('Invalid false started with fals' + c) }
          continue

        case NULL:
          if (!c) continue
          if (c === 'u') state = NULL2
          else { return emitError('Invalid null started with n' + c) }
          continue

        case NULL2:
          if (!c) continue
          if (c === 'l') state = NULL3
          else { return emitError('Invalid null started with nu' + c) }
          continue

        case NULL3:
          if (!c) continue
          if (c === 'l') {
            emitValueOpen(null)
            emitValueClose()
            state = stack.pop() || VALUE
          } else { return emitError('Invalid null started with nul' + c) }
          continue

        case NUMBER_DECIMAL_POINT:
          if (c === '.') {
            numberNode += c
            state = NUMBER_DIGIT
          } else { return emitError('Leading zero not followed by .') }
          continue

        case NUMBER_DIGIT:
          if ('0123456789'.indexOf(c) !== -1) numberNode += c
          else if (c === '.') {
            if (numberNode.indexOf('.') !== -1) { return emitError('Invalid number has two dots') }
            numberNode += c
          } else if (c === 'e' || c === 'E') {
            if (numberNode.indexOf('e') !== -1 ||
              numberNode.indexOf('E') !== -1) { return emitError('Invalid number has two exponential') }
            numberNode += c
          } else if (c === '+' || c === '-') {
            if (!(p === 'e' || p === 'E')) { return emitError('Invalid symbol in number') }
            numberNode += c
          } else {
            if (numberNode) {
              emitValueOpen(parseFloat(numberNode))
              emitValueClose()
              numberNode = ''
            }
            i-- // go back one
            state = stack.pop() || VALUE
          }
          continue

        default:
          return emitError('Unknown state: ' + state)
      }
    }
    if (position >= bufferCheckPosition) { checkBufferLength() }
  }
}




/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return httpTransport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return streamingHttp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__detectCrossOrigin_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parseResponseHeaders_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__functional__ = __webpack_require__(0);






function httpTransport () {
  return new XMLHttpRequest()
}

/**
 * A wrapper around the browser XmlHttpRequest object that raises an
 * event whenever a new part of the response is available.
 *
 * In older browsers progressive reading is impossible so all the
 * content is given in a single call. For newer ones several events
 * should be raised, allowing progressive interpretation of the response.
 *
 * @param {Function} oboeBus an event bus local to this Oboe instance
 * @param {XMLHttpRequest} xhr the xhr to use as the transport. Under normal
 *          operation, will have been created using httpTransport() above
 *          but for tests a stub can be provided instead.
 * @param {String} method one of 'GET' 'POST' 'PUT' 'PATCH' 'DELETE'
 * @param {String} url the url to make a request to
 * @param {String|Null} data some content to be sent with the request.
 *                      Only valid if method is POST or PUT.
 * @param {Object} [headers] the http request headers to send
 * @param {boolean} withCredentials the XHR withCredentials property will be
 *    set to this value
 */
function streamingHttp (oboeBus, xhr, method, url, data, headers, withCredentials) {
  'use strict'

  var emitStreamData = oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["m" /* STREAM_DATA */]).emit
  var emitFail = oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["b" /* FAIL_EVENT */]).emit
  var numberOfCharsAlreadyGivenToCallback = 0
  var stillToSendStartEvent = true

  // When an ABORTING message is put on the event bus abort
  // the ajax request
  oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["a" /* ABORTING */]).on(function () {
    // if we keep the onreadystatechange while aborting the XHR gives
    // a callback like a successful call so first remove this listener
    // by assigning null:
    xhr.onreadystatechange = null

    xhr.abort()
  })

  /**
    * Handle input from the underlying xhr: either a state change,
    * the progress event or the request being complete.
    */
  function handleProgress () {
    if (String(xhr.status)[0] === '2') {
      var textSoFar = xhr.responseText
      var newText = (' ' + textSoFar.substr(numberOfCharsAlreadyGivenToCallback)).substr(1)

      /* Raise the event for new text.

       On older browsers, the new text is the whole response.
       On newer/better ones, the fragment part that we got since
       last progress. */

      if (newText) {
        emitStreamData(newText)
      }

      numberOfCharsAlreadyGivenToCallback = Object(__WEBPACK_IMPORTED_MODULE_2__util__["e" /* len */])(textSoFar)
    }
  }

  if ('onprogress' in xhr) { // detect browser support for progressive delivery
    xhr.onprogress = handleProgress
  }

  function sendStartIfNotAlready (xhr) {
    // Internet Explorer is very unreliable as to when xhr.status etc can
    // be read so has to be protected with try/catch and tried again on
    // the next readyState if it fails
    try {
      stillToSendStartEvent && oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["c" /* HTTP_START */]).emit(
        xhr.status,
        Object(__WEBPACK_IMPORTED_MODULE_3__parseResponseHeaders_browser__["a" /* parseResponseHeaders */])(xhr.getAllResponseHeaders()))
      stillToSendStartEvent = false
    } catch (e) { /* do nothing, will try again on next readyState */ }
  }

  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 2: // HEADERS_RECEIVED
      case 3: // LOADING
        return sendStartIfNotAlready(xhr)

      case 4: // DONE
        sendStartIfNotAlready(xhr) // if xhr.status hasn't been available yet, it must be NOW, huh IE?

        // is this a 2xx http code?
        var successful = String(xhr.status)[0] === '2'

        if (successful) {
          // In Chrome 29 (not 28) no onprogress is emitted when a response
          // is complete before the onload. We need to always do handleInput
          // in case we get the load but have not had a final progress event.
          // This looks like a bug and may change in future but let's take
          // the safest approach and assume we might not have received a
          // progress event for each part of the response
          handleProgress()

          oboeBus(__WEBPACK_IMPORTED_MODULE_1__events__["n" /* STREAM_END */]).emit()
        } else {
          emitFail(Object(__WEBPACK_IMPORTED_MODULE_1__events__["o" /* errorReport */])(
            xhr.status,
            xhr.responseText
          ))
        }
    }
  }

  try {
    xhr.open(method, url, true)

    for (var headerName in headers) {
      xhr.setRequestHeader(headerName, headers[headerName])
    }

    if (!Object(__WEBPACK_IMPORTED_MODULE_0__detectCrossOrigin_browser__["a" /* isCrossOrigin */])(window.location, Object(__WEBPACK_IMPORTED_MODULE_0__detectCrossOrigin_browser__["b" /* parseUrlOrigin */])(url))) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    }

    xhr.withCredentials = withCredentials

    xhr.send(data)
  } catch (e) {
    // To keep a consistent interface with Node, we can't emit an event here.
    // Node's streaming http adaptor receives the error as an asynchronous
    // event rather than as an exception. If we emitted now, the Oboe user
    // has had no chance to add a .fail listener so there is no way
    // the event could be useful. For both these reasons defer the
    // firing to the next JS frame.
    window.setTimeout(
      Object(__WEBPACK_IMPORTED_MODULE_4__functional__["j" /* partialComplete */])(emitFail, Object(__WEBPACK_IMPORTED_MODULE_1__events__["o" /* errorReport */])(undefined, undefined, e))
      , 0
    )
  }
}




/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isCrossOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseUrlOrigin; });
/**
 * Detect if a given URL is cross-origin in the scope of the
 * current page.
 *
 * Browser only (since cross-origin has no meaning in Node.js)
 *
 * @param {Object} pageLocation - as in window.location
 * @param {Object} ajaxHost - an object like window.location describing the
 *    origin of the url that we want to ajax in
 */
function isCrossOrigin (pageLocation, ajaxHost) {
  /*
    * NB: defaultPort only knows http and https.
    * Returns undefined otherwise.
    */
  function defaultPort (protocol) {
    return { 'http:': 80, 'https:': 443 }[protocol]
  }

  function portOf (location) {
    // pageLocation should always have a protocol. ajaxHost if no port or
    // protocol is specified, should use the port of the containing page

    return String(location.port || defaultPort(location.protocol || pageLocation.protocol))
  }

  // if ajaxHost doesn't give a domain, port is the same as pageLocation
  // it can't give a protocol but not a domain
  // it can't give a port but not a domain

  return !!((ajaxHost.protocol && (ajaxHost.protocol !== pageLocation.protocol)) ||
    (ajaxHost.host && (ajaxHost.host !== pageLocation.host)) ||
    (ajaxHost.host && (portOf(ajaxHost) !== portOf(pageLocation)))
  )
}

/* turn any url into an object like window.location */
function parseUrlOrigin (url) {
  // url could be domain-relative
  // url could give a domain

  // cross origin means:
  //    same domain
  //    same port
  //    some protocol
  // so, same everything up to the first (single) slash
  // if such is given
  //
  // can ignore everything after that

  var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/

  // if no match, use an empty array so that
  // subexpressions 1,2,3 are all undefined
  // and will ultimately return all empty
  // strings as the parse result:
  var urlHostMatch = URL_HOST_PATTERN.exec(url) || []

  return {
    protocol: urlHostMatch[1] || '',
    host: urlHostMatch[2] || '',
    port: urlHostMatch[3] || ''
  }
}




/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseResponseHeaders; });
// based on gist https://gist.github.com/monsur/706839

/**
 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
 * headers according to the format described here:
 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
 * This method parses that string into a user-friendly key/value pair object.
 */
function parseResponseHeaders (headerStr) {
  var headers = {}

  headerStr && headerStr.split('\u000d\u000a')
    .forEach(function (headerPair) {
      // Can't use split() here because it does the wrong thing
      // if the header value has the string ": " in it.
      var index = headerPair.indexOf('\u003a\u0020')

      headers[headerPair.substring(0, index)] =
        headerPair.substring(index + 2)
    })

  return headers
}




/***/ })
/******/ ])["default"];
});