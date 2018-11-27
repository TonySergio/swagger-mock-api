'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var chance = new _chance2['default']();

var ObjectParser = (function () {
  function ObjectParser(parser) {
    _classCallCheck(this, ObjectParser);

    this.parser = parser;
  }

  _createClass(ObjectParser, [{
    key: 'canParse',
    value: function canParse(node) {
      return !!node.properties;
    }
  }, {
    key: 'parse',
    value: function parse(node, additional) {
      return this.generateObject(node, additional);
    }
  }, {
    key: 'generateObject',
    value: function generateObject(node, additional) {
      var _this = this;

      var ret = {};
      var schema = _hoek2['default'].clone(node);
      schema = schema.properties || schema;
      var array = additional && additional.array;

      var _loop = function (k) {
        var isUnique = schema[k].format && schema[k].format == 'uuid';
        var metUnique = false;

        if (isUnique && array) {
          var _loop2 = function () {
            var curentVal = _this.parser.parse(schema[k]);
            if (!array.find(function (it) {
              return it[k] == curentVal;
            })) {
              metUnique = true;
              ret[k] = curentVal;
            }
          };

          while (!metUnique) {
            _loop2();
          }
        } else {
          ret[k] = _this.parser.parse(schema[k]);
        }
      };

      for (var k in schema) {
        _loop(k);
      }

      return ret;
    }
  }]);

  return ObjectParser;
})();

exports['default'] = ObjectParser;
module.exports = exports['default'];