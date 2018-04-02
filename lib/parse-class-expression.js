"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("./utils");

var cache = Object.create(null);

var _default = function _default(expression) {
  if (cache[expression]) return cache[expression];
  var modifier;
  var className;
  var binding;
  var role;

  if ((0, _utils.includes)(expression, '=', 1)) {
    // eg: disabled=isDisabled
    modifier = '=';

    var _expression$split = expression.split('=');

    className = _expression$split[0];
    binding = _expression$split[1];
  } else {
    var _modifier = expression[0];

    if (_modifier === '@') {
      // eg: @button
      modifier = _modifier;
      className = expression.substr(1);
      role = className;
    } else if (_modifier === ':') {
      // eg: :disabled
      modifier = _modifier;
      className = expression.substr(1);
      binding = className;
    } else {
      className = expression;
    }
  }

  cache[expression] = {
    modifier: modifier,
    className: className,
    binding: binding,
    role: role
  };
  return cache[expression];
};

exports.default = _default;