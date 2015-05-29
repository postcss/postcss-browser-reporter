# PostCSS Messages [![Build Status](https://travis-ci.org/postcss/postcss-messages.svg)](https://travis-ci.org/postcss/postcss-messages)

> [PostCSS] plugin to display warning messages right in your browser.

If a plugin before this one is throwning a warning, this plugin will append warning messages to `html:before`.

![Postcss-messages – warnings from other postcss plugins in your browser](http://postcss.github.io/postcss-messages/screenshot.png)

## Usage

Put this plugin after all plugins if you want to cover all possible warnings:

```js
postcss([
  require('other-plugin'),
  require('postcss-messages')
])
```

### Options

#### `selector` (`{String}`, default: `html::before`)

You can override selector that will be used to display messages:

```js
var messages = require('postcss-messages')
postcss([
  messages({
    selector: 'body:before'
  })
])
```

#### `styles` (`{Object}`, default: opininated styles)

You can override default styles applied to the selector:

```js
var messages = require('postcss-messages')
postcss([
  messages({
    styles: {
      color: 'gray',
      'text-align': 'center'
    }
  })
])
```

See [PostCSS] docs for examples for your environment.

## License

The MIT License

[PostCSS]: https://github.com/postcss/postcss
