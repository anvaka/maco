var React = require('react');

module.exports = makeIt;

function makeIt(factory) {
  inherits(Maker, React.Component);

  return Maker;

  function Maker(props) {
    classCallCheck(this, Maker);
    Maker.prototype.constructor.call(this, props);
    factory.bind(this)(this);
  }
}

function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype);
  if (superClass) subClass.__proto__ = superClass;
}
