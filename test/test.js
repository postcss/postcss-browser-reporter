var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var warninger = function (css, result) {
    result.warn("Here is some warning");
};
var warninger2 = function (css, result) {
    result.warn("Here is another warning");
};

var before = function (opts) {
    return 'a{ }\n' +
           ( opts && opts.selector ? opts.selector : 'html:before' ) + '{\n' +
           '    display: block;\n' +
           '    padding: 20px 30px;\n' +
           '    background: red;\n' +
           '    font-size: 16px;\n' +
           '    color: ' + ( opts && opts.changedColor ? opts.changedColor : 'white' ) + ';\n' +
           '    white-space: pre;\n' +
           ( opts && opts.addedStyle ? ('    ' + opts.addedStyle + ';\n') : '') +
           '    content: "Here is some warning' + ( opts && opts.content ? opts.content : '' ) + '"\n' +
           '}';
};

var test = function (input, output, plugins) {
    expect(postcss(plugins).process(input).css).to.eql(output);
};

describe('postcss-messages', function () {

    it('displays warning before body', function () {
        test('a{ }', before(), [warninger, plugin()]);
    });

    it('not displays warning before body if disabled', function () {
        test('a{ }', 'a{ }', [warninger, plugin({ disabled: true })]);
    });

    it('displays two warnings from two plugins on new lines', function () {
        test('a{ }', before({ content: '\\00000aHere is another warning' }), [warninger, warninger2, plugin({})]);
    });

    it('displays only warnings from plugins before', function () {
        test('a{ }', before(), [warninger, plugin({}), warninger2]);
    });

    it('displays warning before body', function () {
        test('a{ }', before({ selector: 'body:before' }), [warninger, plugin({ selector: 'body:before' })]);
    });

    it('displays warning with custom font color', function () {
        test('a{ }', before({ changedColor: 'gray' }), [warninger, plugin({ styles: { color: 'gray' } })]);
    });

    it('displays warning with custom style property ', function () {
        test('a{ }', before({ addedStyle: 'text-align: center' }), [warninger, plugin({ styles: { 'text-align': 'center' } })]);
    });

});
