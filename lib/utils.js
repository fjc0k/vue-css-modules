"use strict";

exports.__esModule = true;
exports.includes = includes;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.camelCase = camelCase;
exports.dashCase = dashCase;

function includes(arrayLike, element, fromIndex) {
  if (fromIndex === void 0) {
    fromIndex = 0;
  }

  for (var i = fromIndex, len = arrayLike.length; i < len; i++) {
    if (arrayLike[i] === element) {
      return true;
    }
  }

  return false;
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isString(value) {
  return typeof value === 'string';
}

var camelCaseCache = Object.create(null);

function camelCase(value) {
  if (camelCaseCache[value]) return camelCaseCache[value];
  var result = '';
  var shouldUpperCase = false;

  for (var i = 0, len = value.length; i < len; i++) {
    var char = value[i];

    if (char === '-') {
      shouldUpperCase = true;
    } else {
      result += result && shouldUpperCase ? char.toUpperCase() : char;
      shouldUpperCase = false;
    }
  }

  camelCaseCache[value] = result;
  return result;
}

var dashCaseCache = Object.create(null);

function dashCase(value) {
  if (dashCaseCache[value]) return dashCaseCache[value];
  var result = '';
  var shouldAddDash = false;

  for (var i = value.length - 1; i >= 0; i--) {
    var char = value[i];
    var charCode = char.charCodeAt(0);

    if (charCode >= 65 && charCode <= 90) {
      shouldAddDash = true;
      result = char.toLowerCase() + result;
    } else {
      result = char + (shouldAddDash ? '-' : '') + result;
      shouldAddDash = false;
    }
  }

  dashCaseCache[value] = result;
  return result;
}