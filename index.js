var postcss = require('postcss');

module.exports = postcss.plugin('postcss-messages', function (opts) {
    opts = opts || {};

    if ( opts.disabled === true ) {
        return function () { };
    }

    return function (css, result) {
        css.append({ selector: 'body:before' });
        css.last.append({ prop: 'background', value: 'red' });
        css.last.append({ prop: 'display', value: 'block' });
        css.last.append({ prop: 'padding', value: '20px 30px' });
        css.last.append({ prop: 'color', value: 'white' });
        css.last.append({ prop: 'font-size', value: '16px' });
        css.last.append({ prop: 'white-space', value: 'pre' });

        var content = result.warnings().map(function (message) {
            return message.toString().replace(/"/g, '\\"');
        }).join('\\00000a');

        css.last.append({ prop: 'content', value: '"' + content + '"' });
    };
});
