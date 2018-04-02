"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("./utils");

var cache = Object.create(null);

var _default = function _default(expression) {
  if (cache[expression]) return cache[expression];
  var className;
  var binding;
  var bindingValue;
  var role;

  if ((0, _utils.includes)(expression, '=', 1)) {
    // eg: disabled=isDisabled
    var _expression$split = expression.split('=');

    className = _expression$split[0];
    binding = _expression$split[1];
  } else {
    var modifier = expression[0];

    if (modifier === '$') {
      // eg: $type
      binding = expression.substr(1);
      bindingValue = true;
    } else if (modifier === '@') {
      // eg: @button
      className = expression.substr(1);
      role = className;
    } else if (modifier === ':') {
      // eg: :disabled
      className = expression.substr(1);
      binding = (0, _utils.camelCase)(className);
    } else {
      className = expression;
    }
  }

  cache[expression] = {
    className: className,
    binding: binding,
    bindingValue: bindingValue,
    role: role
  };
  return cache[expression];
};

exports.default = _default;