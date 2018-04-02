/*!
 * vue-css-modules v0.0.1
 * (c) 2018-present fjc0k <fjc0kb@gmail.com>
 * Released under the MIT License.
 */
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
var modifiers = ['@', ':'];
var parseClassExpression = (function (expression) {
  if (cache[expression]) return cache[expression];
  var modifier;
  var className;
  var binding;

  if (includes(expression, '=', 1)) {
    // eg: disabled=isDisabled
    modifier = '=';

    var _expression$split = expression.split('=');

    className = _expression$split[0];
    binding = _expression$split[1];
  } else if (includes(modifiers, expression[0])) {
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
});

var INJECTED = '__CSSModules__';
var INJECT_ATTR = 'styleName';

function createElement(_) {
  var _this = this;

  var args = [].slice.call(arguments, 1); // for functional component

  if (isFunction(_)) {
    return createElement.bind(_, {
      createElement: _,
      styles: args[0]
    });
  }

  var h = _.createElement,
      _$styles = _.styles,
      styles = _$styles === void 0 ? this && this.$style || {} : _$styles;
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

var index = (function (styles) {
  return {
    beforeCreate: function beforeCreate() {
      if (this[INJECTED]) return;
      this[INJECTED] = true;
      this.$createElement = createElement.bind(this, {
        createElement: this.$createElement,
        styles: styles
      });
    }
  };
});

export default index;
