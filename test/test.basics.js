var qunit = module;

if (typeof module !== undefined && module.exports) {
  var Herje = require('../herje.js');
  qunit = QUnit.module;
}

test("Simple templates", function() {
  equal(Herje('hello'), 'hello', 'hello');
  equal(Herje(['h1', 'hello']).toString(), '<h1>hello</h1>', 'h1 hello');
  equal(Herje(['h1', ['a', 'hello']]), '<h1><a>hello</a></h1>', 'h1 a hello');
});

test("Templates with many children", function() {
  equal(Herje(['h1', ['a', 'hello'], ['a', 'world!']]).toString(), '<h1><a>hello</a><a>world!</a></h1>', 'h1 a hello a world!');
});

test("Templates with attributes", function() {
  equal(Herje(['h1', { 'class': 'hello' }, 'hello']), '<h1 class="hello">hello</h1>', 'h1 class=hello hello');
  equal(Herje(['h1', ['a', { 'href': '/' }, 'hello']]), '<h1><a href="/">hello</a></h1>', 'h1 a href=/ hello');
});

test("Bulleted list example from http://www.jsonml.org/", function() {
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

test("Level one template modified by callback", function() {
  function callback(node) {
    if (typeof node.elements === 'string') {
      node.elements += '01';
    }
    return node;
  }
  equal(Herje('hello', callback), 'hello01', 'hello with callback');
});

test("Level two template modified by callback", function() {
  function callback(node) {
    if (typeof node.elements === 'string') {
      node.elements += '01';
    }
    return node;
  }
  equal(Herje(['h1', 'hello'], callback), '<h1>hello01</h1>', 'hello with callback');
});

test("Level three template modified by callback", function() {
  function callback(node) {
    if (typeof node.elements === 'string') {
      node.elements += '01';
    }
    return node;
  }
  equal(Herje(['h1', ['a', 'hello']], callback).toString(), '<h1><a>hello01</a></h1>', 'hello with callback');
});

test("Append string to element", function() {
  var element = document.createElement('div');

  Herje('hello').appendTo(element);

  equal(element.innerHTML, 'hello', 'hello');
});

test("Append element to element", function() {
  var element = document.createElement('div');

  Herje(['h1', 'hello']).appendTo(element);

  equal(element.innerHTML, '<h1>hello</h1>', 'hello');
});

