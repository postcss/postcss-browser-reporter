# PostCSS Messages [![Build Status](https://travis-ci.org/postcss/postcss-messages.svg)](https://travis-ci.org/postcss/postcss-messages)

[PostCSS] plugin to display warning messages right in your browser.

If a plugin before this one is throwning a warning, it will append the following styles:

```css
body:before{
    background: red;
    display: block;
    padding: 20px 30px;
    color: white;
    font-size: 16px;
    white-space: pre;
    content: "whatever-plugin:a.css:10:4: Here is a warning !"
}
```

## Usage

Put this plugin after all plugins if you want to cover all possible warnings:

```js
postcss([ require('other-plugin'),
          require('postcss-messages') ])
```

See [PostCSS] docs for examples for your environment.

## License

The MIT License

[PostCSS]: https://github.com/postcss/postcss
