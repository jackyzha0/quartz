(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('localforage', ['module', 'exports', './drivers/indexeddb', './drivers/websql', './drivers/localstorage', './utils/serializer', './utils/promise', './utils/executeCallback', './utils/executeTwoCallbacks', './utils/includes', './utils/isArray'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./drivers/indexeddb'), require('./drivers/websql'), require('./drivers/localstorage'), require('./utils/serializer'), require('./utils/promise'), require('./utils/executeCallback'), require('./utils/executeTwoCallbacks'), require('./utils/includes'), require('./utils/isArray'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.indexeddb, global.websql, global.localstorage, global.serializer, global.promise, global.executeCallback, global.executeTwoCallbacks, global.includes, global.isArray);
        global.localforage = mod.exports;
    }
})(this, function (module, exports, _indexeddb, _websql, _localstorage, _serializer, _promise, _executeCallback, _executeTwoCallbacks, _includes, _isArray) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _indexeddb2 = _interopRequireDefault(_indexeddb);

    var _websql2 = _interopRequireDefault(_websql);

    var _localstorage2 = _interopRequireDefault(_localstorage);

    var _serializer2 = _interopRequireDefault(_serializer);

    var _promise2 = _interopRequireDefault(_promise);

    var _executeCallback2 = _interopRequireDefault(_executeCallback);

    var _executeTwoCallbacks2 = _interopRequireDefault(_executeTwoCallbacks);

    var _includes2 = _interopRequireDefault(_includes);

    var _isArray2 = _interopRequireDefault(_isArray);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    // Drivers are stored here when `defineDriver()` is called.
    // They are shared across all instances of localForage.
    var DefinedDrivers = {};

    var DriverSupport = {};

    var DefaultDrivers = {
        INDEXEDDB: _indexeddb2.default,
        WEBSQL: _websql2.default,
        LOCALSTORAGE: _localstorage2.default
    };

    var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

    var OptionalDriverMethods = ['dropInstance'];

    var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

    var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'localforage',
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: 'keyvaluepairs',
        version: 1.0
    };

    function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function () {
            var _args = arguments;
            return localForageInstance.ready().then(function () {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
        };
    }

    function extend() {
        for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];

            if (arg) {
                for (var key in arg) {
                    if (arg.hasOwnProperty(key)) {
                        if ((0, _isArray2.default)(arg[key])) {
                            arguments[0][key] = arg[key].slice();
                        } else {
                            arguments[0][key] = arg[key];
                        }
                    }
                }
            }
        }

        return arguments[0];
    }

    var LocalForage = function () {
        function LocalForage(options) {
            _classCallCheck(this, LocalForage);

            for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                    var driver = DefaultDrivers[driverTypeKey];
                    var driverName = driver._driver;
                    this[driverTypeKey] = driverName;

                    if (!DefinedDrivers[driverName]) {
                        // we don't need to wait for the promise,
                        // since the default drivers can be defined
                        // in a blocking manner
                        this.defineDriver(driver);
                    }
                }
            }

            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;

            this._wrapLibraryMethodsWithReady();
            this.setDriver(this._config.driver).catch(function () {});
        }

        // Set any config values for localForage; can be called anytime before
        // the first API call (e.g. `getItem`, `setItem`).
        // We loop through options so we don't overwrite existing config
        // values.


        LocalForage.prototype.config = function config(options) {
            // If the options argument is an object, we use it to set values.
            // Otherwise, we return either a specified config value or all
            // config values.
            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
                // If localforage is ready and fully initialized, we can't set
                // any new configuration values. Instead, we return an error.
                if (this._ready) {
                    return new Error("Can't call config() after localforage " + 'has been used.');
                }

                for (var i in options) {
                    if (i === 'storeName') {
                        options[i] = options[i].replace(/\W/g, '_');
                    }

                    if (i === 'version' && typeof options[i] !== 'number') {
                        return new Error('Database version must be a number.');
                    }

                    this._config[i] = options[i];
                }

                // after all config options are set and
                // the driver option is used, try setting it
                if ('driver' in options && options.driver) {
                    return this.setDriver(this._config.driver);
                }

                return true;
            } else if (typeof options === 'string') {
                return this._config[options];
            } else {
                return this._config;
            }
        };

        LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new _promise2.default(function (resolve, reject) {
                try {
                    var driverName = driverObject._driver;
                    var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                    // A driver name should be defined and not overlap with the
                    // library-defined, default drivers.
                    if (!driverObject._driver) {
                        reject(complianceError);
                        return;
                    }

                    var driverMethods = LibraryMethods.concat('_initStorage');
                    for (var i = 0, len = driverMethods.length; i < len; i++) {
                        var driverMethodName = driverMethods[i];

                        // when the property is there,
                        // it should be a method even when optional
                        var isRequired = !(0, _includes2.default)(OptionalDriverMethods, driverMethodName);
                        if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                            reject(complianceError);
                            return;
                        }
                    }

                    var configureMissingMethods = function configureMissingMethods() {
                        var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                            return function () {
                                var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                                var promise = _promise2.default.reject(error);
                                (0, _executeCallback2.default)(promise, arguments[arguments.length - 1]);
                                return promise;
                            };
                        };

                        for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                            var optionalDriverMethod = OptionalDriverMethods[_i];
                            if (!driverObject[optionalDriverMethod]) {
                                driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                            }
                        }
                    };

                    configureMissingMethods();

                    var setDriverSupport = function setDriverSupport(support) {
                        if (DefinedDrivers[driverName]) {
                            console.info('Redefining LocalForage driver: ' + driverName);
                        }
                        DefinedDrivers[driverName] = driverObject;
                        DriverSupport[driverName] = support;
                        // don't use a then, so that we can define
                        // drivers that have simple _support methods
                        // in a blocking manner
                        resolve();
                    };

                    if ('_support' in driverObject) {
                        if (driverObject._support && typeof driverObject._support === 'function') {
                            driverObject._support().then(setDriverSupport, reject);
                        } else {
                            setDriverSupport(!!driverObject._support);
                        }
                    } else {
                        setDriverSupport(true);
                    }
                } catch (e) {
                    reject(e);
                }
            });

            (0, _executeTwoCallbacks2.default)(promise, callback, errorCallback);
            return promise;
        };

        LocalForage.prototype.driver = function driver() {
            return this._driver || null;
        };

        LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? _promise2.default.resolve(DefinedDrivers[driverName]) : _promise2.default.reject(new Error('Driver not found.'));

            (0, _executeTwoCallbacks2.default)(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
        };

        LocalForage.prototype.getSerializer = function getSerializer(callback) {
            var serializerPromise = _promise2.default.resolve(_serializer2.default);
            (0, _executeTwoCallbacks2.default)(serializerPromise, callback);
            return serializerPromise;
        };

        LocalForage.prototype.ready = function ready(callback) {
            var self = this;

            var promise = self._driverSet.then(function () {
                if (self._ready === null) {
                    self._ready = self._initDriver();
                }

                return self._ready;
            });

            (0, _executeTwoCallbacks2.default)(promise, callback, callback);
            return promise;
        };

        LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
            var self = this;

            if (!(0, _isArray2.default)(drivers)) {
                drivers = [drivers];
            }

            var supportedDrivers = this._getSupportedDrivers(drivers);

            function setDriverToConfig() {
                self._config.driver = self.driver();
            }

            function extendSelfWithDriver(driver) {
                self._extend(driver);
                setDriverToConfig();

                self._ready = self._initStorage(self._config);
                return self._ready;
            }

            function initDriver(supportedDrivers) {
                return function () {
                    var currentDriverIndex = 0;

                    function driverPromiseLoop() {
                        while (currentDriverIndex < supportedDrivers.length) {
                            var driverName = supportedDrivers[currentDriverIndex];
                            currentDriverIndex++;

                            self._dbInfo = null;
                            self._ready = null;

                            return self.getDriver(driverName).then(extendSelfWithDriver).catch(driverPromiseLoop);
                        }

                        setDriverToConfig();
                        var error = new Error('No available storage method found.');
                        self._driverSet = _promise2.default.reject(error);
                        return self._driverSet;
                    }

                    return driverPromiseLoop();
                };
            }

            // There might be a driver initialization in progress
            // so wait for it to finish in order to avoid a possible
            // race condition to set _dbInfo
            var oldDriverSetDone = this._driverSet !== null ? this._driverSet.catch(function () {
                return _promise2.default.resolve();
            }) : _promise2.default.resolve();

            this._driverSet = oldDriverSetDone.then(function () {
                var driverName = supportedDrivers[0];
                self._dbInfo = null;
                self._ready = null;

                return self.getDriver(driverName).then(function (driver) {
                    self._driver = driver._driver;
                    setDriverToConfig();
                    self._wrapLibraryMethodsWithReady();
                    self._initDriver = initDriver(supportedDrivers);
                });
            }).catch(function () {
                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = _promise2.default.reject(error);
                return self._driverSet;
            });

            (0, _executeTwoCallbacks2.default)(this._driverSet, callback, errorCallback);
            return this._driverSet;
        };

        LocalForage.prototype.supports = function supports(driverName) {
            return !!DriverSupport[driverName];
        };

        LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
        };

        LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];
            for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];
                if (this.supports(driverName)) {
                    supportedDrivers.push(driverName);
                }
            }
            return supportedDrivers;
        };

        LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
            // Add a stub for each driver API method that delays the call to the
            // corresponding driver method until localForage is ready. These stubs
            // will be replaced by the driver methods as soon as the driver is
            // loaded, so there is no performance impact.
            for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
            }
        };

        LocalForage.prototype.createInstance = function createInstance(options) {
            return new LocalForage(options);
        };

        return LocalForage;
    }();

    exports.default = new LocalForage();
    module.exports = exports['default'];
});
