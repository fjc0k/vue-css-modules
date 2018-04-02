/*!
 * vue-css-modules v0.0.1
 * (c) 2018-present fjc0k <fjc0kb@gmail.com>
 * Released under the MIT License.
 */
var INJECTED = '__CSSModules__';
var INJECT_ATTR = 'styleName';

var inject = function inject(h) {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var data = args[1];

  if (typeof data === 'object') {
    data.staticClass || (data.staticClass = '');
    var modules = data[INJECT_ATTR] || data.attrs[INJECT_ATTR] || '';

    if (modules.length) {
      (Array.isArray(modules) ? modules : [modules]).forEach(function (module) {
        if (!module || typeof module !== 'string') return;
        module.split(/\s+/g).forEach(function (classExpression) {
          var _classExpression$spli = classExpression.split('='),
              className = _classExpression$spli[0],
              binding = _classExpression$spli[1];

          var staticClass = !binding && className || _this[binding] && className;

          if (staticClass) {
            data.staticClass += " " + staticClass;
            data.staticClass.trim();
          }
        });
      });
    }
  }

  return h.apply(this, args);
};

var index = {
  beforeCreate: function beforeCreate() {
    if (this[INJECTED]) return;
    this[INJECTED] = true;
    this.$createElement = inject.bind(this, this.$createElement);
  }
};

export default index;
