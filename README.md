Herje
=====

Just another tiny JsonML renderer. Runs in node and in the browser.


Turns

    ['h1', ['a', { 'href': 'http:die-tf.de' }, 'TF']]

into

    <h1><a href="http://die-tf.de">TF</a></h1>


See http://www.jsonml.org/


Usage
-----

    // render to string
    bodyjson(template).toString();

    // append to dom node
    Herje(template).appendTo(document.getElementById('main'));

    // iterate over each entry
    Herje(template, function(node) {
      // manipulate node
      return node;
    });


(c) 2013 Johannes J. Schmidt

MIT license
