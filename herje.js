// Herje
// make HTML out of JSON
// (c) 2013 Johannes J. Schmidt, TF
// MIT licensed
var Herje = (function() {
  function each(template, selector, callback) {
    var node = {
      elements: template
    };

    if (typeof node.elements === 'string') {
      return callback(node);
    }
    node.tagName = node.elements.shift();
    if (typeof node.elements[0] === 'object' && !Array.isArray(node.elements[0])) {
      node.attributes = node.elements.shift();
    }

    return callback(node);
  }

  function toString(template, selector, callback) {
    return function() {
      return each(template, selector, function(node) {
        if (typeof callback === 'function') {
          node = callback(node);
        }
        
        if (!node.tagName) {
          return node.elements;
        }
        
        var attributesString = node.attributes && Object.keys(node.attributes).map(function(key) {
          return key + '="' + node.attributes[key] + '"';
        }).join(' ');

        return [
          '<' + node.tagName + (attributesString ? ' ' + attributesString : '') + '>',
          node.elements.length ? node.elements.map(function(t) { return toString(t, selector, callback)() }).join('') : '',
          '</' + node.tagName + '>'
        ].join('');
      })
    }
  }

  // TODO:
  // * selector
  // * all
  // * appendTo
  // * each
  return function(template, selector, callback) {
    if (typeof selector === 'function') {
      callback = selector;
      selector = null;
    }

    if (callback && typeof template === 'string') {
      template = callback({elements: template}).elements;
    }

    template.toString = toString(template, selector, callback);

    return template;
  }
})();


if (typeof module !== 'undefined' && module.exports) {
  module.exports = Herje;
}
