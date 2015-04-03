# PostCSS Messages [![Build Status](https://travis-ci.org/postcss/postcss-messages.svg)](https://travis-ci.org/postcss/postcss-messages)

[PostCSS] plugin to display warning messages right in your browser.

If a plugin before this one is throwning a warning, it will append warning messages to `html:before`.

It should look like this:

![Postcss-messages – warnings from other postcss plugins in your browser](http://postcss.github.io/postcss-messages/screenshot.png)


## Usage

Put this plugin after all plugins if you want to cover all possible warnings:

```js
postcss([ require('other-plugin'),
          require('postcss-messages') ])
```

You can override selector for styles:

```js
var messages = require('postcss-messages')
postcss([ messages({ selector: 'body:before' })
```

Or all styles for displayed messages:

```js
var messages = require('postcss-messages')
postcss([ messages({ styles: { color: 'gray', 'text-align': 'center' } })
```

See [PostCSS] docs for examples for your environment.

## License

The MIT License

[PostCSS]: https://github.com/postcss/postcss
