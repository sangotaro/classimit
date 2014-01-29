(function() {
  'use strict';

  var Class = require('../src/classimit');
  require('../node_modules/chai/chai').should();


  describe('type checking', function () {
    it('Class is a Function', function() {
      Class.should.be.a('Function');
    });
  });

  var Hoge = Class.extend({
    initialized: false,
    init: function() {
      this.initialized = true;
      return 'this is Hoge.init';
    },
    func1: function() {
      return 'this is Hoge.func1';
    },
    func2: function() {
      return 'this is Hoge.func2';
    }
  });

  describe('object extending', function() {
    var hoge = new Hoge();

    it('should be initialized', function() {
      hoge.initialized.should.be.equal(true);
    });
    it('should have func1', function() {
      hoge.func1().should.be.equal('this is Hoge.func1');
    });
  });

  describe('inheritance of object properties', function() {
    var Piyo = Hoge.extend({});
    var piyo = new Piyo();

    it('should have inherited init', function() {
      piyo.initialized.should.be.equal(true);
    });
    it('should have inherited init func1', function() {
      piyo.func1().should.be.equal('this is Hoge.func1');
    });
  });

  describe('override of object properties', function() {
    var Fuga = Hoge.extend({
      initialized2: false,
      init: function() {
        this.initialized2 = true;
        return 'this is Fuga.init';
      },
      func1: function() {
        return 'this is Fuga.func1';
      },
      func2: function() {
        return this._super();
      },   
    });
    var fuga = new Fuga();

    it('should have overridden init', function() {
      fuga.initialized.should.be.equal(false);
      fuga.initialized2.should.be.equal(true);
    });
    it('should have overridden func1', function() {
      fuga.func1().should.be.equal('this is Fuga.func1');
    });
    it('should be able to call parent property', function() {
      fuga.func2().should.be.equal('this is Hoge.func2');
    });
  });
})();