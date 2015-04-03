var postcss = require('postcss');

module.exports = postcss.plugin('postcss-messages', function (opts) {
    if ( opts && opts.disabled === true ) {
        return function () { };
    };

    var styleKeys = ['display', 'padding', 'background', 'font-size', 'color', 'white-space'];

    var defaultStyles = {
      'display': 'block',
      'padding': '20px 30px',
      'background': 'red',
      'font-size': '16px',
      'color': 'white',
      'white-space': 'pre'
    };
    if ( opts && opts.styles ) {
      for ( var attrname in opts.styles ) {
        if ( opts.styles.hasOwnProperty(attrname) ) {
          defaultStyles[attrname] = opts.styles[attrname];
        };
      };
    };

    return function (css, result) {
        css.append({ selector: (opts && opts.selector) ? opts.selector : 'body:before' });
        for ( var style in defaultStyles ) {
          if ( defaultStyles.hasOwnProperty(style) ) {
            css.last.append({ prop: style, value: defaultStyles[style] });
          }
        };

        var content = result.warnings().map(function (message) {
            return message.toString().replace(/"/g, '\\"');
        }).join('\\00000a');

        css.last.append({ prop: 'content', value: '"' + content + '"' });
    };
});
