var qunit = module;

if (typeof module !== undefined && module.exports) {
  var Herje = require('../herje.js');
  qunit = QUnit.module;
}

test("Render simple templates", function() {
  equal(Herje('hello'), 'hello', 'hello');
  equal(Herje(['h1', 'hello']).toString(), '<h1>hello</h1>', 'h1 hello');
  equal(Herje(['h1', ['a', 'hello']]), '<h1><a>hello</a></h1>', 'h1 a hello');
});

test("Render templates with many children", function() {
  equal(Herje(['h1', ['a', 'hello'], ['a', 'world!']]).toString(), '<h1><a>hello</a><a>world!</a></h1>', 'h1 a hello a world!');
});

test("Render templates with attributes", function() {
  equal(Herje(['h1', { 'class': 'hello' }, 'hello']), '<h1 class="hello">hello</h1>', 'h1 class=hello hello');
  equal(Herje(['h1', ['a', { 'href': '/' }, 'hello']]), '<h1><a href="/">hello</a></h1>', 'h1 a href=/ hello');
});

test("Render Bulleted List Example from http://www.jsonml.org/", function() {
  var template = [
    "ul",
    [
      "li",
      {
        "style": "color:red"
      },
      "First Item"
    ],
    [
      "li",
      {
        "title": "Some hover text.",
        "style": "color:green"
      },
      "Second Item"
    ],
    [
      "li",
      [
        "span",
        {
          "class": "code-example-third"
        },
        "Third"
      ],
      " Item"
    ]
  ];
  var html = '<ul><li style="color:red">First Item</li><li title="Some hover text." style="color:green">Second Item</li><li><span class="code-example-third">Third</span> Item</li></ul>';
  equal(Herje(template), html);
});

test("Render level one template modified by callback", function() {
  function callback(node) {
    if (typeof node.elements === 'string') {
      node.elements += '01';
    }
    return node;
  }
  equal(Herje('hello', callback), 'hello01', 'hello with callback');
});

test("Render level two template modified by callback", function() {
  function callback(node) {
    if (typeof node.elements === 'string') {
      node.elements += '01';
    }
    return node;
  }
  equal(Herje(['h1', 'hello'], callback), '<h1>hello01</h1>', 'hello with callback');
});

test("Render level three template modified by callback", function() {
  function callback(node) {
    if (typeof node.elements === 'string') {
      node.elements += '01';
    }
    return node;
  }
  equal(Herje(['h1', ['a', 'hello']], callback).toString(), '<h1><a>hello01</a></h1>', 'hello with callback');
});

