let { test } = require('node:test')
let { equal } = require('node:assert')
let postcss = require('postcss')

let plugin = require('./')

function warninger(css, result) {
  result.warn('Here is some warning')
}

function warninger2(css, result) {
  result.warn('Here is another warning')
}

function warninger3(css, result) {
  result.warn('Warning with details', {
    node: postcss.rule({ source: { start: { column: 99, line: 1 } } }),
    plugin: 'bar'
  })
}

let beforeCustom =
  'a{ }\n' +
  'html::before{\n' +
  '    text-align: center;\n' +
  '    content: "Here is some warning"\n' +
  '}'

function before(opts) {
  opts = opts || {}
  return (
    (opts.code || 'a{ }') +
    '\n' +
    (opts.selector || 'html::before') +
    '{\n' +
    '    display: block;\n' +
    '    z-index: 1000;\n' +
    '    position: fixed;\n' +
    '    top: 0;\n' +
    '    left: 0;\n' +
    '    right: 0;\n' +
    '    font-size: .9em;\n' +
    '    padding: 1.5em 1em 1.5em 4.5em;\n' +
    '    color: white;\n' +
    '    background-color: #DF4F5E;\n' +
    '    background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2248px%22%20height%3D%2248px%22%20viewBox%3D%220%200%20512%20512%22%20enable-background%3D%22new%200%200%20512%20512%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23A82734%22%20id%3D%22warning-4-icon%22%20d%3D%22M228.55%2C134.812h54.9v166.5h-54.9V134.812z%20M256%2C385.188c-16.362%2C0-29.626-13.264-29.626-29.625c0-16.362%2C13.264-29.627%2C29.626-29.627c16.361%2C0%2C29.625%2C13.265%2C29.625%2C29.627C285.625%2C371.924%2C272.361%2C385.188%2C256%2C385.188z%20M256%2C90c91.742%2C0%2C166%2C74.245%2C166%2C166c0%2C91.741-74.245%2C166-166%2C166c-91.742%2C0-166-74.245-166-166C90%2C164.259%2C164.245%2C90%2C256%2C90z%20M256%2C50C142.229%2C50%2C50%2C142.229%2C50%2C256s92.229%2C206%2C206%2C206s206-92.229%2C206-206S369.771%2C50%2C256%2C50z%22%2F%3E%3C%2Fsvg%3E") .5em no-repeat, #DF4F5E linear-gradient(#DF4F5E, #CE3741);\n' +
    '    border: 1px solid #C64F4B;\n' +
    '    border-radius: 3px;\n' +
    '    box-shadow: inset 0 1px 0 #EB8A93, 0 0 .3em rgba(0,0,0, .5);\n' +
    '    white-space: pre-wrap;\n' +
    '    font-family: Menlo, Monaco, monospace;\n' +
    '    text-shadow: 0 1px #A82734;\n' +
    '    content: ' +
    (opts && opts.content ? opts.content : '"Here is some warning"') +
    '\n' +
    '}'
  )
}

function check(input, output, plugins, opts) {
  equal(postcss(plugins).process(input, opts).css, output)
}

test('displays warning before html', () => {
  check('a{ }', before(), [warninger, plugin()])
})

test('displays warning after html if needed', () => {
  let code = 'html::before{ }'
  check(code, before({ code, selector: 'html::after' }), [warninger, plugin()])
  code = 'html:before{ }'
  check(code, before({ code, selector: 'html::after' }), [warninger, plugin()])
})

test('not displays warning before html if disabled', () => {
  check('a{ }', 'a{ }', [warninger, plugin({ disabled: true })])
})

test('not displays warning before html if no warnings', () => {
  check('a{ }', 'a{ }', [plugin()])
})

test('displays two warnings from two plugins on new lines', () => {
  check(
    'a{ }',
    before({
      content: '"Here is some warning\\00000aHere is another warning"'
    }),
    [warninger, warninger2, plugin({})]
  )
})

test('displays warnings with details', () => {
  check(
    'a{ }',
    before({
      content:
        '"1:99\tWarning with details [bar]\\00000aHere is another warning"'
    }),
    [warninger3, plugin({}), warninger2]
  )
})

test('displays warning before body', () => {
  check('a{ }', before({ selector: 'body:before' }), [
    warninger,
    plugin({ selector: 'body:before' })
  ])
})

test('displays warning with custom styles ', () => {
  check('a{ }', beforeCustom, [
    warninger,
    plugin({ styles: { 'text-align': 'center' } })
  ])
})

test('displays warning with file path', () => {
  let path = 'test/test.css'
  check(
    'a{ }',
    before({
      content: '"test/test.css\\00000aHere is some warning"'
    }),
    [warninger, plugin()],
    {
      from: require('node:path').join(process.cwd(), path)
    }
  )
})
