# Maco

This simple script allows you to avoid using javascript "classes" when dealing
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
    i++; // `i` is truly encapsulated. nobody can modify it, but this counter.

    x.forceUpdate(); // tell React to queue the update for us.
  }

  // tell React how to render this component
  x.render = function () {
    return <h2>{x.props.name}: {i}</h2>;
  }
}
```

Now that we've created counter, no extra logic is required to use it from
regular react application:

``` js
// app.js file
var Counter = require('./counter.js');
React.render(<div><Counter name="my counter" /></div>, document.body);
```

# Why?

This approach has couple benefits:

* Unlike prototype-based classes, with maco you can truly encapsulate your data:
It's just a regular javascript closure.
* No need to remember what is `this` anymore. Your component instance is always
passed as a single argument to the function. In the example above it's called `x`.
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

I'm just creates a new component, inherits it from `React.Component` and from
the constructor invokes your "factory" method. Factory function is bound to the
current component. In other words `this` will be the same as what you would
normally expect from React.

I'm also passing current component instance as an argument to the factory
function. It is just for your convenience, so you don't have to do silly
`that = this` dance.

# install

```
npm install maco
```

# license

MIT
