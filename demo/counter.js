// counter.js file
var React = require('react');
module.exports = require('../')(counter, React);

function counter(x) {
  // we will increase counter `i` every second:
  var i = 0;
  setInterval(updateMessage, 1000);

  function updateMessage() {
    i++; // `i` is truly encapsulated. Nobody but this counter can modify it.

    x.forceUpdate(); // tell React to enqueue the update.
  }

  // tell React how to render this component
  x.render = function () {
    // notice regular props, as well as internal `i`:
    return <h2>{x.props.name}: {i}</h2>;
  };
}
