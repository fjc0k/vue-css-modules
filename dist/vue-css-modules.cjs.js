/*!
 * vue-css-modules v0.3.1
 * (c) 2018-present fjc0k <fjc0kb@gmail.com>
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

var cache = Object.create(null);
var parseClassExpression = (function (expression) {
  if (cache[expression]) return cache[expression];
  var modifier;
  var className;
  var binding;
  var role;

  if (includes(expression, '=', 1)) {
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
});

var INJECTED = '__CSSModules__';
var INJECT_ATTR = 'styleName';

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
      (Array.isArray(modules) ? modules : [modules]).forEach(function (module) {
        if (!module || typeof module !== 'string') return;
        module.split(/\s+/g).forEach(function (classExpression) {
          var _parseClassExpression = parseClassExpression(classExpression),
              className = _parseClassExpression.className,
              binding = _parseClassExpression.binding,
              role = _parseClassExpression.role;

          if ((binding ? context[binding] : true) && styles[className]) {
            data.staticClass += " " + styles[className];
            data.staticClass = data.staticClass.trim();
          }

          if (role) {
            data.attrs['data-role'] = role;
          }
        });
      });
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
