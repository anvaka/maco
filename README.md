# Maco

This script allows you to avoid using javascript "classes" when dealing
with React.

# Example

Let's take a look at simple counter component:

``` js
// counter.js file

module.exports = require('maco')(counter);

function counter(x) {
  // we wll increase counter `i` every second:
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
  }
}
```

Now that we have a Counter, no extra logic is required to use it from
react application:

``` js
// app.js file
var Counter = require('./counter.js');
React.render(<div><Counter name="my counter" /></div>, document.body);
```

# Why?

This approach has couple benefits:

* Unlike prototype-based classes, maco allows you to truly encapsulate data:
It's just a regular javascript closure.
* No need to remember what is `this` anymore. The component instance is
passed as an argument to the function. In the example above it's called `x`.
* Dead simple.

# How?

`maco` is very simple wrapper on top of `React.Component`. Actually, it's only
several lines long:

``` js
function maco(factory) {
  inherits(Maker, React.Component);

  return Maker;

  function Maker(props) {
    Maker.prototype.constructor.call(this, props);
    factory.bind(this)(this);
  }
}
```

We create a new child of `React.Component` and from the constructor invoke
the "factory" callback. Factory callback is bound to the current component.
In other words `this` will be the same as what you'd normally expect from
React.

I'm also passing current component instance as an argument to the factory
function. It is just for your convenience, so you don't have to do silly
`that = this` dance.

# install

```
npm install maco
```

# license

MIT
