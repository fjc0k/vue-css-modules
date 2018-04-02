"use strict";

exports.__esModule = true;
exports.includes = includes;
exports.isObject = isObject;
exports.isFunction = isFunction;

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