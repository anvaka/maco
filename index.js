var React = require('react');

module.exports = makeIt;
makeIt.template = makeTemplate;

function makeIt(factory) {
  inherits(Maker, React.Component);

  return Maker;

  function Maker(props) {
    classCallCheck(this, Maker);
    Maker.prototype.constructor.call(this, props);
    factory.bind(this)(this);
  }
}

function makeTemplate(factory) {
  // templates only care about rendering
  return React.createClass({
    render: function() {
      return factory.bind(this)(this.props)
    }
  });
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
