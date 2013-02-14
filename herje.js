// Herje
// make HTML out of JSON
// (c) 2013 Johannes J. Schmidt, TF
// MIT licensed
var Herje = (function() {
  function each(template, callback) {
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

  function toString(template, callback) {
    return function() {
      return each(template, function(node) {
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
          node.elements.length ? node.elements.map(function(t) { return toString(t, callback)() }).join('') : '',
          '</' + node.tagName + '>'
        ].join('');
      })
    }
  }

  function appendTo(template, callback) {
    return function(element) {
      return each(template, function(node) {
        if (typeof callback === 'function') {
          node = callback(node);
        }

        if (!node.tagName) {
          return element.innerHTML = node.elements;
        }

        var el = document.createElement(node.tagName);
        if (node.attributes) {
          for (var key in node.attributes) {
            el.setAttribute(key, node.attributes[key]);
          }
        }
        node.elements.forEach(function(t) {
          appendTo(t, callback)(el);
        });

        element.appendChild(el);
      })
    }
  }

  return function(template, callback) {
    if (typeof template === 'string') {
      return {
        toString: toString(template, callback),
        appendTo: appendTo(template, callback)
      };
    }

    template.toString = toString(template, callback);
    template.appendTo = appendTo(template, callback);

    return template;
  }
})();


if (typeof module !== 'undefined' && module.exports) {
  module.exports = Herje;
}
