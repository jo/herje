Herje
=====

Make HTML out of JSON.

See http://www.jsonml.org/

    [
      "html",
      {
        "lang": "en"
      },
      [
        [
          "head",
          [
            [
              "title",
              "Hello Herje!"
            ]
          ]
        ],
        [
          "body",
          [
            [
              "h1",
              "Hello Herje!"
            ]
          ]
        ]
      ]
    ]


becomes

    <html lang="en">
      <head>
        <title>Hello Herje!</title>
      </head>
      <body>
        <h1>Hello Herje!</h1>
      </body>
    </html>


Usage
-----

    // use with requirejs / commonjs
    var herje = require('bodyjson');

    // legacy usage via global Herje
    var herje = Herje;


    // return string
    herje(template) == bodyjson(template).toString();

    // append to dom node
    // (currently not suppoerted)
    herje(template).appendTo(document.getElementById('main'));

    // iterate over each node
    herje(template, function(node) {
      // manipulate each node
    });

    // filter body ul nodes,
    // return only the found ul nodes
    // (currently not suppoerted)
    herje(template, 'body ul', function(ul) {
      // manipulate the ul node
    });

    // nested chaining
    // (currently not suppoerted)
    herje(template, 'body ul', function(ul) {
      // manipulate the ul node
    })
    .each('li', function(li) {
      // manipulate the nested li node
    });

    // filter and return entire document
    // (currently not suppoerted)
    herje(template, 'body ul', function(ul) {
      // manipulate the ul node
    })
    .all()
    
