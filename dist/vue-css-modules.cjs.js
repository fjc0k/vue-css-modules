/*!
 * vue-css-modules v1.0.5
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
'use strict';

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

var cache = Object.create(null);
var parseClassExpression = (function (expression) {
  if (cache[expression]) return cache[expression];
  var className;
  var binding;
  var bindingValue;
  var role;

  if (includes(expression, '=', 1)) {
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
      binding = camelCase(className);
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
});

var INJECTED = '__CSSModules__';
var INJECT_ATTR = 'styleName';

/* eslint max-depth: 0 guard-for-in: 0 */
function createElement(_) {
  var args = [].slice.call(arguments, 1); // for functional component

  if (isFunction(_)) {
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

  if (isObject(data)) {
    if (!data.staticClass) {
      data.staticClass = '';
    }

    if (!data.attrs) {
      data.attrs = {};
    }

    var modules = data[INJECT_ATTR] || data.attrs[INJECT_ATTR] || '';

    if (modules.length) {
      var _modules = Array.isArray(modules) ? modules : [modules];

      for (var i in _modules) {
        var module = _modules[i];

        if (module && typeof module === 'string') {
          var classExpressions = module.split(/\s+/g);

          for (var _i in classExpressions) {
            var classExpression = classExpressions[_i];

            var _parseClassExpression = parseClassExpression(classExpression),
                className = _parseClassExpression.className,
                binding = _parseClassExpression.binding,
                bindingValue = _parseClassExpression.bindingValue,
                role = _parseClassExpression.role;

            if (bindingValue) {
              className = context[binding];
              binding = undefined;
            }

            if ((binding ? context[binding] : true) && styles[className]) {
              data.staticClass += " " + styles[className];
              data.staticClass = data.staticClass.trim();
            }

            if (role) {
              data.attrs["data-component-" + role] = '';
            }
          }
        }
      }
    } // remove styleName attr


    delete data[INJECT_ATTR];
    delete data.attrs[INJECT_ATTR];
  }

  return h.apply(null, args);
}

var index = (function (styles) {
  return {
    beforeCreate: function beforeCreate() {
      if (this[INJECTED]) return;
      this[INJECTED] = true;
      this.$createElement = createElement.bind(this, {
        createElement: this.$createElement,
        context: this,
        styles: styles
      });
      this._c = createElement.bind(this, {
        createElement: this._c,
        context: this,
        styles: styles
      });
    }
  };
});

module.exports = index;
