(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mobx"), require("react"), require("validatorjs"));
	else if(typeof define === 'function' && define.amd)
		define(["mobx", "react", "validatorjs"], factory);
	else if(typeof exports === 'object')
		exports["mobx-form"] = factory(require("mobx"), require("react"), require("validatorjs"));
	else
		root["mobx-form"] = factory(root["mobx"], root["react"], root["validatorjs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__8__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17;

var _validatorjs = __webpack_require__(8);

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _mobx = __webpack_require__(1);

var _isEqual = __webpack_require__(13);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _getInitialValue = __webpack_require__(12);

var _getInitialValue2 = _interopRequireDefault(_getInitialValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ID_COUNTER = 0;

var FieldState = (_class = function () {
  function FieldState(form, config) {
    _classCallCheck(this, FieldState);

    _initDefineProp(this, 'defaultValue', _descriptor, this);

    _initDefineProp(this, 'disabled', _descriptor2, this);

    _initDefineProp(this, 'errors', _descriptor3, this);

    _initDefineProp(this, 'label', _descriptor4, this);

    _initDefineProp(this, 'name', _descriptor5, this);

    _initDefineProp(this, 'placeholder', _descriptor6, this);

    _initDefineProp(this, 'pristine', _descriptor7, this);

    _initDefineProp(this, 'readOnly', _descriptor8, this);

    _initDefineProp(this, 'initialValue', _descriptor9, this);

    _initDefineProp(this, 'value', _descriptor10, this);

    _initDefineProp(this, 'validateDebounceDurationMs', _descriptor11, this);

    this.form = undefined;
    this.initialConfig = undefined;
    this.parent = undefined;
    this.rules = [];
    this.transform = undefined;
    this.debouncedFormValidate = undefined;

    _initDefineProp(this, 'enable', _descriptor12, this);

    _initDefineProp(this, 'disable', _descriptor13, this);

    _initDefineProp(this, 'setPristine', _descriptor14, this);

    _initDefineProp(this, 'setLabel', _descriptor15, this);

    _initDefineProp(this, 'setRules', _descriptor16, this);

    _initDefineProp(this, 'setFieldStates', _descriptor17, this);

    this.key = ++ID_COUNTER;
    this.form = form;
    this.initialConfig = config;

    // we do this so that observable doesn't make copies. we want the actual reference to stick.
    this.adjacentFields = this.initialConfig.adjacentFields;
    delete this.initialConfig.adjacentFields;

    // this extends this with initialConfig, where all keys become observables #FYI
    (0, _mobx.set)(this, this.initialConfig);

    this.init(config.value);
  } // If it's part of an array field


  _createClass(FieldState, [{
    key: 'validateWithDebounce',
    value: function validateWithDebounce() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.debouncedFormValidate) {
        clearTimeout(this.debouncedFormValidate);
      }

      this.debouncedFormValidate = setTimeout((0, _mobx.action)(function () {
        if (options.removePristineState === true) {
          _this.pristine = false;
        }
        _this.form.validate();
      }), this.validateDebounceDurationMs);
    }
  }, {
    key: 'init',
    value: function init(value) {
      (0, _mobx.set)(this, this.initialConfig);

      var initialValue = (0, _getInitialValue2.default)({ value: value, defaultValue: this.defaultValue });

      this.setValue(initialValue, { validate: false });
      this.initialValue = initialValue;
      this.pristine = true;
    }
  }, {
    key: 'reset',
    value: function reset() {
      var initialValue = (0, _mobx.toJS)(this.initialValue);
      this.init(initialValue);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$validate = options.validate,
          validate = _options$validate === undefined ? true : _options$validate;


      this.value = this._transformInValue((0, _mobx.toJS)(value));

      if (validate) {
        this.validateWithDebounce();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var value = void 0;

      if (e && e.target) {
        value = e.target.value;
      } else {
        value = e;
      }

      this.value = value;
      this.form.invalidate(null);
      this.validateWithDebounce({ removePristineState: true });
    }
  }, {
    key: 'validate',
    value: function validate(values) {
      if (!this.rules) {
        this.errors = [];
        return;
      }

      var rules = _defineProperty({}, this.name, (0, _mobx.toJS)(this.rules));

      var attributeNames = _defineProperty({}, this.name, this.label || this.name);

      var model = this.form.model;


      var validator = new _validatorjs2.default(_extends({ model: model }, values), rules, this.messages);
      validator.setAttributeNames(attributeNames);
      validator.check();

      this.errors = validator.errors.get(this.name);
    }
  }, {
    key: 'setServerErrors',
    value: function setServerErrors(errors) {
      this.errors = errors;
    }
  }, {
    key: 'getProps',
    value: function getProps() {
      return {
        name: this.name,
        value: this.value,
        placeholder: this.placeholder,
        disabled: this.disabled
      };
    }
  }, {
    key: 'getInitialValue',
    value: function getInitialValue() {
      return (0, _mobx.toJS)(this.initialValue);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._transformOutValue((0, _mobx.toJS)(this.value));
    }
  }, {
    key: '_transformInValue',
    value: function _transformInValue(value) {
      return this.transform && this.transform.in ? this.transform.in(value, this.form, this) : value;
    }
  }, {
    key: '_transformOutValue',
    value: function _transformOutValue(value) {
      return this.transform && this.transform.out ? this.transform.out(value, this.form, this) : value;
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (!this.parent) {
        console.warn('Calling remove() on a field with no parent', this.name);
        return;
      }

      this.parent.remove(this);
    }
  }, {
    key: 'dirty',
    get: function get() {
      return !(0, _isEqual2.default)(this.getValue(), this.getInitialValue());
    }
  }, {
    key: 'hasError',
    get: function get() {
      return this.errors && this.errors.length > 0;
    }
  }, {
    key: 'valid',
    get: function get() {
      return !this.hasError;
    }
  }]);

  return FieldState;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'defaultValue', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'disabled', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'errors', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'label', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'name', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'placeholder', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'pristine', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'readOnly', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'initialValue', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return undefined;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'value', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'validateDebounceDurationMs', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 250;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'init', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'reset', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'reset'), _class.prototype), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'enable', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      _this2.disabled = false;
    };
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'disable', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3.disabled = true;
    };
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'setPristine', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (value) {
      _this4.pristine = value;
    };
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'setLabel', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (label) {
      _this5.label = label;
    };
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'setRules', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (rules) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$validate2 = options.validate,
          validate = _options$validate2 === undefined ? true : _options$validate2;


      _this6.rules = rules;

      if (validate) {
        _this6.form.validate();
      }
    };
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'setFieldStates', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (fieldStates) {
      _this7.fieldStates = fieldStates;
      _this7.form.validate();
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'setValue', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onChange', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dirty', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'dirty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hasError', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'hasError'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'valid', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'valid'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validate', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'validate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setServerErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setServerErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'remove'), _class.prototype)), _class);
exports.default = FieldState;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(4);

exports.default = (0, _react.createContext)();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = __webpack_require__(1);

var _FieldState2 = __webpack_require__(0);

var _FieldState3 = _interopRequireDefault(_FieldState2);

var _buildFieldState2 = __webpack_require__(9);

var _buildFieldState3 = _interopRequireDefault(_buildFieldState2);

var _get2 = __webpack_require__(7);

var _get3 = _interopRequireDefault(_get2);

var _set = __webpack_require__(6);

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ArrayFieldState = (_class = function (_FieldState) {
  _inherits(ArrayFieldState, _FieldState);

  function ArrayFieldState() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ArrayFieldState);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArrayFieldState.__proto__ || Object.getPrototypeOf(ArrayFieldState)).call.apply(_ref, [this].concat(args))), _this), _initDefineProp(_this, 'fieldStates', _descriptor, _this), _initDefineProp(_this, 'invalidChildren', _descriptor2, _this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ArrayFieldState, [{
    key: 'getFieldConfigs',
    // The indices of invalid children

    value: function getFieldConfigs() {
      var arrayName = this.initialConfig.originalName + '[]';
      return this.form.fieldConfigs.filter(function (config) {
        return config.name.startsWith(arrayName);
      });
    }
  }, {
    key: 'init',
    value: function init(value) {
      var _this2 = this;

      if (this.initialValue !== value) {
        this.initialValue = this._transformInValue((0, _mobx.toJS)(value));
        this.fieldStates.clear();

        if (Array.isArray(value)) {
          value.forEach(function (currValue) {
            return _this2.add(currValue, { validate: false, onInit: true });
          });
        }
      }
    }
  }, {
    key: 'add',
    value: function add(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var insertIdx = options.insertIdx,
          _options$validate = options.validate,
          validate = _options$validate === undefined ? true : _options$validate;

      var fieldState = this.buildFieldState(value, options);

      if (insertIdx >= 0) {
        this.fieldStates.splice(insertIdx, 0, fieldState);
      } else {
        this.fieldStates.push(fieldState);
      }

      if (validate) {
        this.form.validate();
      }

      return fieldState;
    }
  }, {
    key: 'buildFieldState',
    value: function buildFieldState(value) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$onInit = options.onInit,
          onInit = _options$onInit === undefined ? false : _options$onInit;

      var fieldState = {};

      this.getFieldConfigs().forEach(function (config) {
        var fieldName = config.name.substring(_this3.initialConfig.originalName.length + 3);
        var fieldValue = (0, _get3.default)(value, fieldName.endsWith('[]') ? fieldName.slice(0, -2) : fieldName);
        var fieldConfig = _extends({}, config);

        if (onInit && fieldValue !== undefined) {
          fieldConfig.value = fieldValue;
        }

        fieldConfig.parent = _this3;
        fieldConfig.adjacentFields = fieldState;

        var field = (0, _buildFieldState3.default)(_this3.form, fieldName, fieldConfig);

        if (field) {
          fieldState[field.name] = field;

          if (!onInit && fieldValue !== undefined) {
            field.setValue(fieldValue);
          }
        }
      });

      return fieldState;
    }
  }, {
    key: 'remove',
    value: function remove(idxOrObject) {
      if (typeof idxOrObject === 'number') {
        this.fieldStates.splice(idxOrObject, 1);
      } else {
        this.fieldStates.splice(this.fieldStates.findIndex(function (fieldState) {
          return fieldState === idxOrObject.adjacentFields;
        }), 1);
      }
      this.form.validate();
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var _this4 = this;

      this.fieldStates.clear();

      if (Array.isArray(value)) {
        value.forEach(function (val) {
          return _this4.add(val, { validate: false });
        });
      }

      this.validateWithDebounce();
    }
  }, {
    key: 'map',


    /**
     * Usage:
     * const field = form.getField('users');
     *
     * field.setValue([{ firstName: 'Aaron' }],[{ firstName: 'Dave'}]);
     *
     * field.fieldStates[1].firstName.setValue('Dave');
     *
     * const markup = field.map(({ firstName, lastName }, idx) => (
     *   <fieldset>
     *     <Field field={firstName}>
     *       <Input />
     *     </Field>
     *     <Field field={lastName}>
     *       <Input />
     *     </Field>
     *     <Button onClick={() => lastName.setValue('Something')} />
     *     <RemoveButton onClick={() => field.remove(idx)} />
     *   </fieldset>
     *   <AddButton onClick={() => field.add()} />
     * ));
     */
    value: function map(iterator) {
      return this.fieldStates.map(iterator);
    }
  }, {
    key: 'forEach',
    value: function forEach(iterator) {
      this.fieldStates.forEach(iterator);
    }
  }, {
    key: 'filter',
    value: function filter(iterator) {
      return this.fieldStates.filter(iterator);
    }
  }, {
    key: 'some',
    value: function some(iterator) {
      return this.fieldStates.some(iterator);
    }
  }, {
    key: 'at',
    value: function at(idx) {
      return this.fieldStates[idx];
    }
  }, {
    key: 'size',
    value: function size() {
      return this.fieldStates.length;
    }
  }, {
    key: 'getDirtyAt',
    value: function getDirtyAt(idx) {
      var row = this.at(idx);
      return Object.keys(row).some(function (fieldName) {
        return row[fieldName].dirty;
      });
    }
  }, {
    key: 'validate',
    value: function validate(values) {
      var _this5 = this;

      _get(ArrayFieldState.prototype.__proto__ || Object.getPrototypeOf(ArrayFieldState.prototype), 'validate', this).call(this, values);

      var invalidChildren = [];
      var rowCounter = 0;

      this.fieldStates.forEach(function (row, rowIdx) {
        if (_this5.shouldExclude(row)) {
          return;
        }

        var rowValue = (0, _get3.default)(values, _this5.name)[rowCounter];
        rowCounter += 1;

        if (_this5.ignore(rowValue)) {
          return;
        }

        Object.keys(row).forEach(function (fieldName) {
          var field = row[fieldName];

          field.validate(Object.assign({}, values, rowValue));

          if (field.errors && field.errors.length > 0) {
            _this5.errors.push(field.label + ' (' + (rowIdx + 1) + '): ' + field.errors);
            if (!invalidChildren.includes(rowIdx)) {
              invalidChildren.push(rowIdx);
            }
          }
        });
      });

      this.invalidChildren = invalidChildren;
    }
  }, {
    key: 'shouldExclude',
    value: function shouldExclude(row) {
      var rowValue = {};

      Object.keys(row).forEach(function (fieldName) {
        (0, _set2.default)(rowValue, fieldName, (0, _mobx.toJS)(row[fieldName].getValue()));
      });

      return this.exclude(rowValue);
    }
  }, {
    key: 'getValue',
    value: function getValue(rowIdx) {
      var _this6 = this;

      if (rowIdx >= 0) {
        var row = this.fieldStates[rowIdx];
        var rowValue = {};

        Object.keys(row).forEach(function (fieldName) {
          (0, _set2.default)(rowValue, fieldName, (0, _mobx.toJS)(row[fieldName].getValue()));
        });

        return this.exclude(rowValue) ? undefined : rowValue;
      }

      var values = [];

      this.fieldStates.forEach(function (row, idx) {
        var value = _this6.getValue(idx);

        if (value) {
          values.push(value);
        }
      });

      return this._transformOutValue(values);
    }
  }, {
    key: 'getInitialValue',
    value: function getInitialValue() {
      // Note: this is only really meant for the purposes of dirty checks
      // mileage may vary for other purposes
      if (this.initialValue === undefined) {
        return [];
      }

      return _get(ArrayFieldState.prototype.__proto__ || Object.getPrototypeOf(ArrayFieldState.prototype), 'getInitialValue', this).call(this);
    }
  }, {
    key: 'exclude',
    value: function exclude(rowValue) {
      return this.excludeChildren && this.excludeChildren(rowValue);
    }
  }, {
    key: 'ignore',
    value: function ignore(rowValue) {
      if (!rowValue) {
        return true;
      }

      return this.ignoreChildren && this.ignoreChildren(rowValue);
    }
  }, {
    key: 'pristine',
    get: function get() {
      return this.fieldStates.every(function (row) {
        return Object.keys(row).every(function (fieldName) {
          return row[fieldName].pristine;
        });
      });
    }
  }]);

  return ArrayFieldState;
}(_FieldState3.default), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'fieldStates', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'invalidChildren', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'init', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'add', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'add'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildFieldState', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'buildFieldState'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'remove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setValue', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pristine', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'pristine'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validate', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'validate'), _class.prototype)), _class);
exports.default = ArrayFieldState;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _desc, _value, _class;

var _mobx = __webpack_require__(1);

var _validatorjs = __webpack_require__(8);

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _FieldState = __webpack_require__(0);

var _FieldState2 = _interopRequireDefault(_FieldState);

var _ArrayFieldState2 = __webpack_require__(3);

var _ArrayFieldState3 = _interopRequireDefault(_ArrayFieldState2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var FlatArrayFieldState = (_class = function (_ArrayFieldState) {
  _inherits(FlatArrayFieldState, _ArrayFieldState);

  function FlatArrayFieldState() {
    _classCallCheck(this, FlatArrayFieldState);

    return _possibleConstructorReturn(this, (FlatArrayFieldState.__proto__ || Object.getPrototypeOf(FlatArrayFieldState)).apply(this, arguments));
  }

  _createClass(FlatArrayFieldState, [{
    key: 'add',
    value: function add(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$validate = options.validate,
          validate = _options$validate === undefined ? true : _options$validate;

      this.fieldStates.push(new _FieldState2.default(this.form, _extends({}, this.initialConfig, { value: value, parent: this })));
      if (validate) {
        this.form.validate();
      }
    }
  }, {
    key: 'remove',
    value: function remove(idxOrField) {
      var idx = idxOrField;

      if (typeof idxOrField !== 'number') {
        idx = this.fieldStates.findIndex(function (field) {
          return field === idxOrField;
        });
      }

      _get(FlatArrayFieldState.prototype.__proto__ || Object.getPrototypeOf(FlatArrayFieldState.prototype), 'remove', this).call(this, idx);
      this.form.validate();
    }
  }, {
    key: 'clearValue',
    value: function clearValue() {
      this.fieldStates.clear();
      this.form.validate();
    }
  }, {
    key: 'setChildren',
    value: function setChildren(children) {
      this.children = children;
      this.form.validate();
    }
  }, {
    key: 'validate',
    value: function validate(values) {
      var _this2 = this;

      _FieldState2.default.prototype.validate.call(this, values);

      this.fieldStates.forEach(function (field, rowIdx) {
        var rowValue = _this2.getValue(rowIdx);

        if (_this2.ignore(rowValue)) {
          field.errors = [];
          return;
        }

        var value = _defineProperty({}, field.name, rowValue);

        var rules = _defineProperty({}, field.name, _this2.children ? _this2.children.rules : _this2.rules);

        var attributeNames = _defineProperty({}, _this2.name, _this2.label || _this2.name);

        var messages = _this2.children ? _this2.children.messages : {};

        var validator = new _validatorjs2.default(value, rules, messages);
        validator.setAttributeNames(attributeNames);
        validator.check();

        field.errors = validator.errors.get(field.name);

        if (field.errors && field.errors.length > 0) {
          _this2.errors.push(_this2.label + ' (' + (rowIdx + 1) + '): ' + field.errors);
        }
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(rowIdx) {
      if (rowIdx >= 0) {
        var rowValue = this.fieldStates[rowIdx].getValue();

        return this.exclude(rowValue) ? undefined : rowValue;
      }

      return _get(FlatArrayFieldState.prototype.__proto__ || Object.getPrototypeOf(FlatArrayFieldState.prototype), 'getValue', this).call(this);
    }
  }, {
    key: 'pristine',
    get: function get() {
      return this.fieldStates.every(function (field) {
        return field.pristine;
      });
    }
  }, {
    key: 'hasError',
    get: function get() {
      return this.errors && this.errors.length > 0 || this.fieldStates.some(function (row) {
        return row.hasError;
      });
    }
  }]);

  return FlatArrayFieldState;
}(_ArrayFieldState3.default), (_applyDecoratedDescriptor(_class.prototype, 'add', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'add'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'remove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearValue', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clearValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setChildren', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setChildren'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validate', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'validate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pristine', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'pristine'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hasError', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'hasError'), _class.prototype)), _class);
exports.default = FlatArrayFieldState;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = set;
/**
 * Simple version of _.set() to avoid the mostly useless dependency
 */
function set(object, field, value) {
  if (!object || !field) {
    return;
  }

  var parts = field.split('.');
  var currObj = object;
  var i = 0;
  for (; i < parts.length - 1; i += 1) {
    if (currObj) {
      currObj = currObj[parts[i]];
    }
  }

  if (currObj) {
    currObj[parts[i]] = value;
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
/**
 * Simple version of _.get() to avoid the mostly useless dependency
 */
function get(object, field) {
  if (!object || !field) {
    return null;
  }

  var parts = field.split('.');
  return parts.reduce(function (acc, part) {
    return acc && acc[part];
  }, object);
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = buildFieldState;

var _ArrayFieldState = __webpack_require__(3);

var _ArrayFieldState2 = _interopRequireDefault(_ArrayFieldState);

var _FieldState = __webpack_require__(0);

var _FieldState2 = _interopRequireDefault(_FieldState);

var _FlatArrayFieldState = __webpack_require__(5);

var _FlatArrayFieldState2 = _interopRequireDefault(_FlatArrayFieldState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildFieldState(form, fieldName, fieldConfig) {
  var fieldState = null;

  if (!fieldName.includes('[].')) {
    var finalConfig = _extends({}, fieldConfig, { originalName: fieldConfig.name, name: fieldName });

    if (fieldConfig.isComplexArray) {
      // Array that will contain complex things
      fieldState = new _ArrayFieldState2.default(form, finalConfig);
    } else if (fieldName.endsWith('[]')) {
      // Simple Array
      finalConfig.name = fieldName.slice(0, -2);
      fieldState = new _FlatArrayFieldState2.default(form, finalConfig);
    } else {
      // Simple Field
      fieldState = new _FieldState2.default(form, finalConfig);
    }
  }

  return fieldState;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

var _mobx = __webpack_require__(1);

var _buildFieldState = __webpack_require__(9);

var _buildFieldState2 = _interopRequireDefault(_buildFieldState);

var _get = __webpack_require__(7);

var _get2 = _interopRequireDefault(_get);

var _set = __webpack_require__(6);

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var FormState = (_class = function () {
  function FormState(config) {
    var _this = this;

    _classCallCheck(this, FormState);

    _initDefineProp(this, 'fieldStates', _descriptor, this);

    _initDefineProp(this, 'error', _descriptor2, this);

    _initDefineProp(this, 'errors', _descriptor3, this);

    _initDefineProp(this, 'submitted', _descriptor4, this);

    this.onSubmit = function () {
      return console.warn('No onSubmit() provided');
    };

    this.onChange = function () {};

    this.onCancel = function () {};

    this.onRemove = function () {};

    this.fieldConfigs = [];
    this.fieldGroups = {};
    this.initialOptions = {};
    this.options = {};
    this.initialValues = {};

    _initDefineProp(this, 'setRules', _descriptor5, this);

    _initDefineProp(this, 'resetFormState', _descriptor6, this);

    _initDefineProp(this, 'validate', _descriptor7, this);

    var collection = config.collection,
        options = config.options,
        fields = config.fields,
        permissions = config.permissions,
        model = config.model,
        values = config.values,
        onSubmit = config.onSubmit,
        onChange = config.onChange,
        onCancel = config.onCancel,
        onRemove = config.onRemove;


    this.collection = collection;
    this.options = options || {};
    this.initialOptions = _extends({}, this.options);
    this.fieldConfigs = Object.keys(fields).map(function (name) {
      return _extends({}, fields[name], { name: name });
    });
    this.fieldGroups = this.options.groups || {};
    this.fieldStates = [];
    this.permissions = Object.assign({ create: true, delete: true, edit: true }, permissions);

    this.fieldConfigs.forEach(function (fieldConfig) {
      var fieldState = (0, _buildFieldState2.default)(_this, fieldConfig.name, fieldConfig);
      if (fieldState) {
        _this.fieldStates.push(fieldState);
      }
    });

    if (model) {
      this.setModel(model);
    }

    if (values) {
      this.init(values);
    }

    this.onSubmit = onSubmit || this.onSubmit;
    this.onChange = onChange || this.onChange;
    this.onCancel = onCancel || this.onCancel;
    this.onRemove = onRemove || this.onRemove;
  }

  _createClass(FormState, [{
    key: 'setModel',
    value: function setModel(model) {
      if (this.initialOptions.showPristineErrors === undefined) {
        this.options.showPristineErrors = !model.isNew;
      }

      this.model = model;
      this.init(model.attributes ? model.attributes.toJS() : (0, _mobx.toJS)(model));
    }
  }, {
    key: 'init',
    value: function init(values) {
      this.fieldStates.forEach(function (field) {
        return field.init((0, _get2.default)(values, field.name));
      });
      this.initialValues = values;

      if (this.options.validationOnInit !== false) {
        this.validate();
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.submitted = false;
      this.fieldStates.forEach(function (field) {
        return field.reset();
      });

      this.validate();
    }
  }, {
    key: 'addFields',
    value: function addFields(config, values) {
      var _this2 = this;

      Object.keys(config).forEach(function (fieldName) {
        return _this2.addField(fieldName, config[fieldName], undefined, { validate: false });
      });

      if (values) {
        this.setValues(values);
      }
    }
  }, {
    key: 'addField',
    value: function addField(name, config, value) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (!this.fieldStates.find(function (f) {
        return f.name === name;
      })) {
        var _options$validate = options.validate,
            validate = _options$validate === undefined ? true : _options$validate;

        var fieldConfig = _extends({}, config, { name: name });
        this.fieldConfigs.push(fieldConfig);
        var fieldState = (0, _buildFieldState2.default)(this, name, _extends({}, fieldConfig, { value: value }));
        if (fieldState) {
          this.fieldStates.push(fieldState);
        }

        if (validate) {
          this.validate();
        }
      } else if (value) {
        this.setValue(name, value, options);
      }
    }
  }, {
    key: 'removeField',
    value: function removeField(name) {
      var configIdx = this.fieldConfigs.findIndex(function (config) {
        return config.name === name;
      });
      if (configIdx >= 0) {
        this.fieldConfigs.splice(configIdx, 1);
      } else {
        console.warn('Field config not found for field ' + name);
      }

      var stateIdx = this.fieldStates.findIndex(function (field) {
        return field.name === name;
      });
      if (stateIdx >= 0) {
        this.fieldStates.splice(stateIdx, 1);
      } else {
        console.warn('Field config not found for field ' + name);
      }
      this.validate();
    }
  }, {
    key: 'invalidate',
    value: function invalidate(message) {
      this.error = message;
    }
  }, {
    key: 'addFieldsToGroup',
    value: function addFieldsToGroup(fields, group) {
      var _this3 = this;

      Object.keys(fields).forEach(function (field) {
        if (!_this3.fieldGroups[group].includes(field)) {
          _this3.fieldGroups[group].push(field);
        }
      });
    }
  }, {
    key: 'addToGroup',
    value: function addToGroup(groups, group, field) {
      if (Object.keys(groups).includes(group)) {
        groups[group].push(field.name);
      } else {
        groups[group] = [field.name];
      }

      return groups;
    }
  }, {
    key: 'isGroupDirty',
    value: function isGroupDirty(group) {
      return !!this.dirtyGroups[group];
    }
  }, {
    key: 'getMatchingFields',
    value: function getMatchingFields(fieldName) {
      var fieldNameRegex = new RegExp(fieldName);
      return this.fieldStates.filter(function (fieldState) {
        return fieldNameRegex.test(fieldState.name);
      });
    }

    // Only returns groups that are not pristine and that are in error.

  }, {
    key: 'submit',
    value: function submit(onSubmit) {
      this.error = null;
      this.submitted = true;

      var submitFn = onSubmit || this.onSubmit;
      submitFn(this, this.getValues());
    }
  }, {
    key: 'getField',
    value: function getField(fieldName) {
      var field = this.fieldStates.find(function (f) {
        return f.name === fieldName;
      });

      if (!field) {
        console.warn('Field "' + fieldName + '" not found.');
      }

      return field;
    }
  }, {
    key: 'getFields',
    value: function getFields() {
      return this.fieldStates;
    }
  }, {
    key: 'getOptionValue',
    value: function getOptionValue(fieldName, modelValue) {
      var field = this.getField(fieldName);
      if (!field) {
        return false;
      }

      if (!field.options) {
        console.warn('Field "' + fieldName + '" has no options[], getOptionValue will return undefined"');
        return undefined;
      }

      // Use the form's value if no specific value is requested
      var value = modelValue !== undefined ? modelValue : field.getValue();

      return field.options.find(function (option) {
        return option.value === value;
      }).label;
    }
  }, {
    key: 'getValue',
    value: function getValue(fieldName) {
      var field = this.getField(fieldName);
      if (!field) {
        return false;
      }

      return this.getField(fieldName).getValue();
    }
  }, {
    key: 'getValues',
    value: function getValues() {
      var values = {};
      this.fieldStates.forEach(function (field) {
        return (0, _set2.default)(values, field.name, field.getValue());
      });
      return values;
    }
  }, {
    key: 'getDirtyValues',
    value: function getDirtyValues() {
      var values = {};
      this.fieldStates.forEach(function (field) {
        return field.dirty ? (0, _set2.default)(values, field.name, field.getValue()) : null;
      });
      return values;
    }
  }, {
    key: 'getDirtyFields',
    value: function getDirtyFields() {
      return this.fieldStates.filter(function (field) {
        return field.dirty;
      });
    }
  }, {
    key: 'getFieldGroupValues',
    value: function getFieldGroupValues(group) {
      var _this4 = this;

      var values = {};
      this.fieldStates.forEach(function (field) {
        if (_this4.fieldGroups[group].includes(field.name)) {
          (0, _set2.default)(values, field.name, field.getValue());
        }
      });

      return values;
    }
  }, {
    key: 'setValue',
    value: function setValue(fieldName, value, options) {
      this.getField(fieldName).setValue(value, options);
    }
  }, {
    key: 'setValues',
    value: function setValues(values) {
      var _this5 = this;

      Object.keys(values).forEach(function (fieldName) {
        return _this5.setValue(fieldName, values[fieldName], { validate: false });
      });
      this.validate();
    }
  }, {
    key: 'invalidGroups',
    get: function get() {
      var _this6 = this;

      var invalid = {};

      Object.keys(this.fieldGroups).forEach(function (group) {
        _this6.fieldGroups[group].forEach(function (fieldName) {
          _this6.getMatchingFields(fieldName).forEach(function (field) {
            if (!field.valid && !field.pristine) {
              if (field.isComplexArray) {
                field.errors.forEach(function (error) {
                  var errorList = error.split(','); // This is done to handle nested complex array errors
                  errorList.forEach(function () {
                    invalid = _this6.addToGroup(invalid, group, field);
                  });
                });
              } else {
                invalid = _this6.addToGroup(invalid, group, field);
              }
            }
          });
        });
      });

      return invalid;
    }
  }, {
    key: 'dirtyGroups',
    get: function get() {
      var _this7 = this;

      var dirty = {};

      Object.keys(this.fieldGroups).forEach(function (group) {
        _this7.fieldGroups[group].forEach(function (fieldName) {
          _this7.getMatchingFields(fieldName).forEach(function (field) {
            if (field && field.dirty) {
              dirty = _this7.addToGroup(dirty, group, field);
            }
          });
        });
      });

      return dirty;
    }

    // Groups that have invalid values that aren't dirty because they are not yet filled out.

  }, {
    key: 'incompleteGroups',
    get: function get() {
      var _this8 = this;

      var incomplete = {};

      Object.keys(this.fieldGroups).forEach(function (group) {
        _this8.fieldGroups[group].forEach(function (fieldName) {
          _this8.getMatchingFields(fieldName).forEach(function (field) {
            if (!field.valid && field.pristine) {
              incomplete = _this8.addToGroup(incomplete, group, field);
            }
          });
        });
      });

      return incomplete;
    }

    // Groups that are valid and complete.

  }, {
    key: 'completeGroups',
    get: function get() {
      var _this9 = this;

      return Object.keys(this.fieldGroups).filter(function (group) {
        return _this9.fieldGroups[group].every(function (fieldName) {
          return _this9.getMatchingFields(fieldName).every(function (field) {
            return field.valid;
          });
        });
      });
    }
  }, {
    key: 'dirty',
    get: function get() {
      return this.fieldStates.some(function (field) {
        return field.dirty;
      });
    }
  }, {
    key: 'pristine',
    get: function get() {
      return this.fieldStates.every(function (field) {
        return field.pristine;
      });
    }
  }, {
    key: 'valid',
    get: function get() {
      return this.fieldStates.every(function (field) {
        return field.valid;
      });
    }
  }]);

  return FormState;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'fieldStates', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'errors', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'submitted', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'setRules', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function (fieldState, rules) {
      _this10.fieldConfigs.forEach(function (fieldConfig) {
        if (fieldState.initialConfig && fieldConfig.name === fieldState.initialConfig.originalName) {
          fieldConfig.rules = rules;
          fieldState.rules = rules;
        }
      });

      _this10.validate();
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'setModel', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setModel'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'init', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'reset', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'reset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addFields', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addFields'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addField', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeField', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'removeField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'invalidate', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'invalidate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'invalidGroups', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'invalidGroups'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dirtyGroups', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'dirtyGroups'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'incompleteGroups', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'incompleteGroups'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'completeGroups', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'completeGroups'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dirty', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'dirty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pristine', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'pristine'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'valid', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'valid'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'submit', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'submit'), _class.prototype), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'resetFormState', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this11 = this;

    return function () {
      _this11.submitted = false;
      _this11.fieldStates = [];
      _this11.fieldConfigs = [];
      _this11.fieldGroups = {};
      _this11.initialOptions = {};
      _this11.options = {};
      _this11.initialValues = {};
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'setValues', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setValues'), _class.prototype), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'validate', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this12 = this;

    return function () {
      _this12.errors = [];

      var values = _this12.getValues();

      _this12.fieldStates.forEach(function (field) {
        field.validate(values);

        if (field.errors.length) {
          _this12.errors = _this12.errors.concat(field.errors);
        }
      });

      return _this12.valid;
    };
  }
})), _class);
exports.default = FormState;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (Component) {
  return function (props) {
    return _react2.default.createElement(
      _FormContext2.default.Consumer,
      null,
      function (form) {
        return _react2.default.createElement(Component, _extends({}, props, { form: form }));
      }
    );
  };
};

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _FormContext = __webpack_require__(2);

var _FormContext2 = _interopRequireDefault(_FormContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInitialValue;
function getInitialValue(_ref) {
  var value = _ref.value,
      defaultValue = _ref.defaultValue;

  var initialValue = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  return value !== undefined && value !== null ? value : initialValue;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isEqual;
var falseyEquivalents = [null, undefined, ''];

/**
 * Non-strict-ish, deep comparison to replace strict _.isEqual() behavior.
 *
 * This has one intentional limitation specific to FieldState usage:
 *   null, undefined and empty string values are treated as equal.
 */
function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return value1.length === value2.length && value1.every(function (val1, idx) {
      return isEqual(val1, value2[idx]);
    });
  } else if ((typeof value1 === 'undefined' ? 'undefined' : _typeof(value1)) === 'object' && (typeof value2 === 'undefined' ? 'undefined' : _typeof(value2)) === 'object') {
    var val1Keys = Object.keys(value1 || {});
    var val2Keys = Object.keys(value2 || {});
    var keys = Array.from(new Set(val1Keys.concat(val2Keys)));

    return keys.every(function (key) {
      return isEqual(value1[key], value2[key]);
    });
  }

  return value1 === value2 || falseyEquivalents.includes(value1) && falseyEquivalents.includes(value2);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _FormState = __webpack_require__(10);

var _FormState2 = _interopRequireDefault(_FormState);

var _FormContext = __webpack_require__(2);

var _FormContext2 = _interopRequireDefault(_FormContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Form(_ref) {
  var fields = _ref.fields,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options;

  return function formWrapper(WrappedComponent) {
    return function (_Component) {
      _inherits(FormWrapperComponent, _Component);

      function FormWrapperComponent() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, FormWrapperComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = FormWrapperComponent.__proto__ || Object.getPrototypeOf(FormWrapperComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(FormWrapperComponent, [{
        key: 'render',
        value: function render() {
          var form = this.state.form;


          if (!form) {
            return null;
          }

          var onSubmit = form.onSubmit,
              onCancel = form.onCancel,
              onRemove = form.onRemove;


          return _react2.default.createElement(
            _FormContext2.default.Provider,
            { value: form },
            _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
              form: form,
              handleSave: onSubmit,
              handleCancel: onCancel,
              handleRemove: onRemove
            }))
          );
        }
      }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          var onChange = nextProps.onChange,
              permissions = nextProps.permissions,
              model = nextProps.model,
              values = nextProps.values;


          if (!prevState.form) {
            var onSubmit = FormWrapperComponent.getHandleSave(nextProps);
            var onCancel = FormWrapperComponent.getHandleCancel(nextProps);
            var onRemove = FormWrapperComponent.getHandleRemove(nextProps);

            var _form = new _FormState2.default({
              model: model,
              values: values,
              fields: fields,
              options: options,
              permissions: permissions,
              onChange: onChange,
              onSubmit: onSubmit,
              onCancel: onCancel,
              onRemove: onRemove
            });

            return { form: _form };
          }

          var form = prevState.form;


          if (nextProps.model && nextProps.model !== form.model) {
            form.setModel(nextProps.model);
          }

          if (nextProps.values !== form.values) {
            form.init(nextProps.values);
          }

          return { form: form };
        }
      }, {
        key: 'getHandleSave',
        value: function getHandleSave(props) {
          var handleSave = props.handleSave;


          return function (form, values) {
            if (handleSave) {
              return handleSave(values);
            }

            return form.model.save(values);
          };
        }
      }, {
        key: 'getHandleCancel',
        value: function getHandleCancel(props) {
          var handleCancel = props.handleCancel;


          return function (form) {
            if (handleCancel) {
              handleCancel();
            } else if (form.collection) {
              form.collection.clearSelection();
            }
          };
        }
      }, {
        key: 'getHandleRemove',
        value: function getHandleRemove(props) {
          var handleRemove = props.handleRemove;


          return function (form) {
            if (handleRemove) {
              return handleRemove();
            }

            return form.model.destroy();
          };
        }
      }]);

      return FormWrapperComponent;
    }(_react.Component);
  };
}

exports.default = Form;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormContext = exports.FlatArrayFieldState = exports.ArrayFieldState = exports.FieldState = exports.FormState = exports.formConsumer = exports.Form = undefined;

var _Form = __webpack_require__(14);

var _Form2 = _interopRequireDefault(_Form);

var _formConsumer = __webpack_require__(11);

var _formConsumer2 = _interopRequireDefault(_formConsumer);

var _FormState = __webpack_require__(10);

var _FormState2 = _interopRequireDefault(_FormState);

var _FieldState = __webpack_require__(0);

var _FieldState2 = _interopRequireDefault(_FieldState);

var _ArrayFieldState = __webpack_require__(3);

var _ArrayFieldState2 = _interopRequireDefault(_ArrayFieldState);

var _FlatArrayFieldState = __webpack_require__(5);

var _FlatArrayFieldState2 = _interopRequireDefault(_FlatArrayFieldState);

var _FormContext = __webpack_require__(2);

var _FormContext2 = _interopRequireDefault(_FormContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Form = _Form2.default;
exports.formConsumer = _formConsumer2.default;
exports.FormState = _FormState2.default;
exports.FieldState = _FieldState2.default;
exports.ArrayFieldState = _ArrayFieldState2.default;
exports.FlatArrayFieldState = _FlatArrayFieldState2.default;
exports.FormContext = _FormContext2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map