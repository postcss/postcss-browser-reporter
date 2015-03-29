# PostCSS Messages [![Build Status](https://travis-ci.org/postcss/postcss-messages.svg)](https://travis-ci.org/postcss/postcss-messages)

[PostCSS] plugin to display warning messages right in your browser.

If in some `other-plugin` before was thrown warning, it will append following styles:

```css
body:before{
    background: red;
    display: block;
    padding: 20px 30px;
    color: white;
    font-size: 16px;
    white-space: pre;
    content: "other-plugin:a.css:10:4: Here is some warning from other plugin"
}
```

## Usage

Put this plugin after all plugins you want to receive warnings:

```js
postcss([ require('other-plugin'),
          require('postcss-messages') ])
```

See [PostCSS] docs for examples for your environment.

## License

The MIT License

[PostCSS]: https://github.com/postcss/postcss
