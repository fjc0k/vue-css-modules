"use strict";

exports.__esModule = true;
exports.default = createElement;

var _utils = require("./utils");

var _parseClassExpression2 = _interopRequireDefault(require("./parse-class-expression"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createElement(_) {
  var _this = this;

  var args = [].slice.call(arguments, 1); // for functional component

  if ((0, _utils.isFunction)(_)) {
    return createElement.bind(_, {
      createElement: _,
      styles: args[0]
    });
  }

  var h = _.createElement,
      _$styles = _.styles,
      styles = _$styles === void 0 ? this && this.$style || {} : _$styles;
  var data = args[1];

  if ((0, _utils.isObject)(data)) {
    if (!data.staticClass) {
      data.staticClass = '';
    }

    if (!data.attrs) {
      data.attrs = {};
    }

    var modules = data[_config.INJECT_ATTR] || data.attrs[_config.INJECT_ATTR] || '';

    if (modules.length) {
      (Array.isArray(modules) ? modules : [modules]).forEach(function (module) {
        if (!module || typeof module !== 'string') return;
        module.split(/\s+/g).forEach(function (classExpression) {
          var _parseClassExpression = (0, _parseClassExpression2.default)(classExpression),
              className = _parseClassExpression.className,
              binding = _parseClassExpression.binding,
              role = _parseClassExpression.role;

          if ((binding ? _this[binding] : true) && styles[className]) {
            data.staticClass += " " + styles[className];
            data.staticClass.trim();
          }

          if (role) {
            data.attrs['data-role'] = role;
          }
        });
      });
    }
  }

  return h.apply(this, args);
}