"use strict";

exports.__esModule = true;
exports.default = createElement;

var _utils = require("./utils");

var _parseClassExpression2 = _interopRequireDefault(require("./parse-class-expression"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-depth: 0 guard-for-in: 0 */
function createElement(_) {
  var args = [].slice.call(arguments, 1); // for functional component

  if ((0, _utils.isFunction)(_)) {
    return createElement.bind(_, {
      createElement: _,
      styles: args[0],
      context: args[1]
    });
  }

  var h = _.createElement,
      _$context = _.context,
      context = _$context === void 0 ? {} : _$context,
      _$styles = _.styles,
      styles = _$styles === void 0 ? context.$style || {} : _$styles;
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
      var _modules = Array.isArray(modules) ? modules : [modules];

      for (var i in _modules) {
        var module = _modules[i];

        if (module && typeof module === 'string') {
          var classExpressions = module.split(/\s+/g);

          for (var _i in classExpressions) {
            var classExpression = classExpressions[_i];

            var _parseClassExpression = (0, _parseClassExpression2.default)(classExpression),
                className = _parseClassExpression.className,
                binding = _parseClassExpression.binding,
                bindingValue = _parseClassExpression.bindingValue,
                role = _parseClassExpression.role;

            if (bindingValue) {
              className = context[binding];
              binding = undefined;
            }

            if ((binding ? context[binding] : true) && styles[className]) {
              data.staticClass = styles[className] + " " + data.staticClass;
              data.staticClass = data.staticClass.trim();
            }

            if (role) {
              data.attrs["data-component-" + role] = '';
            }
          }
        }
      }
    } // remove styleName attr


    delete data[_config.INJECT_ATTR];
    delete data.attrs[_config.INJECT_ATTR];
  }

  return h.apply(null, args);
}