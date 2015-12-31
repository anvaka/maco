var test = require('tap').test;
var maco = require('../index.js');

// just a stub for react
var FakeReact = {
  Component: function () {}
};

test('it can make components', function (t) {
  var Component = maco(componentFactory, FakeReact);
  var c = new Component();

  t.end();

  function componentFactory(x) {
    t.ok(x === this, 'component instance is passed to maco');
  }
});

test('it can bind to react', function(t) {
  var boundMaco = maco.bindToReact(FakeReact);
  var Component = boundMaco(componentFactory);
  var c = new Component();
  t.ok(c.constructor === FakeReact.Component, 'constructor is correct');

  t.end();

  function componentFactory(x) {
    t.ok(x === this, 'component instance is passed to maco');
  }
});
