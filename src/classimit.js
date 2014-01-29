(function(g) {
  'use strict';

  var Class = function() {};

  var superRegExp = /\b_super\b/;

  var extend = function(props) {
    var parent = this;
    var superProps = parent.prototype;
    var name;

    var child = function() {
      if (this.init) this.init.apply(this, arguments);
    };

    // Add static properties
    for (name in parent) {
      child[name] = parent[name];
    }

    // Set the prototype chain
    var Klass = function() {};
    Klass.prototype = superProps;
    var proto = new Klass();
    child.prototype = proto;
    child.constructor = child;

    var wrap = function(name, fn) {
      return function() {
        var tmp = this._super; // _super is stored just in case
        this._super = superProps[name];
        var wrapper = fn.apply(this, arguments);
        this._super = tmp;
        return wrapper;
      };
    };

    // Add instance properties
    for (name in props) {
      if (typeof props[name] === 'function' &&
          typeof superProps[name] === 'function' &&
          superRegExp.test(props[name])) {
        proto[name] = wrap(name, props[name]);
      } else {
        proto[name] = props[name];
      }
    }

    return child;
  };

  Class.extend = extend;

  if (typeof define === 'function' && define.amd) {
    define(function() { return Class; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Class;
  } else {
    g.Class = Class;
  }
})(this);
