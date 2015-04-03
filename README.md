# PostCSS Messages [![Build Status](https://travis-ci.org/postcss/postcss-messages.svg)](https://travis-ci.org/postcss/postcss-messages)

[PostCSS] plugin to display warning messages right in your browser.

If a plugin before this one is throwning a warning, it will append the following styles:

```css
html:before{
    display: block;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: .9em;
    padding: 1.5em 1em 1.5em 4.5em;
    color: white;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2248px%22%20height%3D%2248px%22%20viewBox%3D%220%200%20512%20512%22%20enable-background%3D%22new%200%200%20512%20512%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23A82734%22%20id%3D%22warning-4-icon%22%20d%3D%22M228.55%2C134.812h54.9v166.5h-54.9V134.812z%20M256%2C385.188c-16.362%2C0-29.626-13.264-29.626-29.625c0-16.362%2C13.264-29.627%2C29.626-29.627c16.361%2C0%2C29.625%2C13.265%2C29.625%2C29.627C285.625%2C371.924%2C272.361%2C385.188%2C256%2C385.188z%20M256%2C90c91.742%2C0%2C166%2C74.245%2C166%2C166c0%2C91.741-74.245%2C166-166%2C166c-91.742%2C0-166-74.245-166-166C90%2C164.259%2C164.245%2C90%2C256%2C90z%20M256%2C50C142.229%2C50%2C50%2C142.229%2C50%2C256s92.229%2C206%2C206%2C206s206-92.229%2C206-206S369.771%2C50%2C256%2C50z%22%2F%3E%3C%2Fsvg%3E") .5em no-repeat, linear-gradient(#DF4F5E, #CE3741);
    border: 1px solid #C64F4B;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 #EB8A93, 0 0 .3em rgba(0,0,0, .5);
    white-space: pre;
    font-family: Menlo, Monaco, monospace;
    text-shadow: 0 1px #A82734;
    content: "autoprefixer: menu.css:4:4: Outdated direction syntax in gradient\00000apostcss-important: header.css:10:4: Avoid !important declaration"
}
```

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
