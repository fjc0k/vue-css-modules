"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("./utils");

var cache = Object.create(null);
var modifiers = ['@', ':'];

var _default = function _default(expression) {
  if (cache[expression]) return cache[expression];
  var modifier;
  var className;
  var binding;

  if ((0, _utils.includes)(expression, '=', 1)) {
    // eg: disabled=isDisabled
    modifier = '=';

    var _expression$split = expression.split('=');

    className = _expression$split[0];
    binding = _expression$split[1];
  } else if ((0, _utils.includes)(modifiers, expression[0])) {
    // eg: @button :disabled
    modifier = expression[0];
    className = expression.substr(1);
  } else {
    // eg: icon
    className = expression;
  }

  cache[expression] = {
    modifier: modifier,
    className: className,
    binding: binding,
    role: modifier === '@' && className
  };
  return cache[expression];
};

exports.default = _default;