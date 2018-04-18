"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createElement = _interopRequireDefault(require("./create-element"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(styles) {
  return {
    beforeCreate: function beforeCreate() {
      if (this[_config.INJECTED]) return;
      this[_config.INJECTED] = true;
      this.$createElement = _createElement.default.bind(this, {
        createElement: this.$createElement,
        context: this,
        styles: styles
      });
      this._c = _createElement.default.bind(this, {
        createElement: this._c,
        context: this,
        styles: styles
      });
    }
  };
};

exports.default = _default;