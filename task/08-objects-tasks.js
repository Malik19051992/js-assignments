'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}
Object.defineProperty(Rectangle, "getArea", { get: function () { return this.width * this.height; } });




/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    var o = JSON.parse(json);
    o.__proto__ = proto;
    return o;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {

    element: function (value) {

        var o = Object.assign({}, this);
        if(o.hasOwnProperty('elem')){
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        if(o.hasOwnProperty('idValue')||o.hasOwnProperty('classes')||o.hasOwnProperty('attributties')||o.hasOwnProperty('pseudoClasses')||o.hasOwnProperty('pseudoElements')){
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        o.elem = value;
        return o;
    },

    id: function (value) {
        var o = Object.assign({}, this);
        if(o.hasOwnProperty('idValue')){
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        if(o.hasOwnProperty('classes')||o.hasOwnProperty('attributties')||o.hasOwnProperty('pseudoClasses')||o.hasOwnProperty('pseudoElements')){
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        o.idValue = value;
        return o;
    },

    class: function (value) {
        var o = Object.assign({}, this);
        if(o.hasOwnProperty('attributties')||o.hasOwnProperty('pseudoClasses')||o.hasOwnProperty('pseudoElements')){
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        if (!o.hasOwnProperty('classes')) {
            o.classes = [];
        }
        o.classes.push(value);
        return o;
    },

    attr: function (value) {
        var o = Object.assign({}, this);
        if(o.hasOwnProperty('pseudoClasses')||o.hasOwnProperty('pseudoElements')){
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        if (!o.hasOwnProperty('attributties')) {
            o.attributties = [];
        }
        o.attributties.push(value);
        return o;
    },

    pseudoClass: function (value) {
        var o = Object.assign({}, this);
        if(o.hasOwnProperty('pseudoElements')){
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }
        if (!o.hasOwnProperty('pseudoClasses')) {
            o.pseudoClasses = [];
        }
        o.pseudoClasses.push(value);
        return o;
    },

    pseudoElement: function (value) {
        var o = Object.assign({}, this);
        if(o.hasOwnProperty('pseudoElements')){
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }
        o.pseudoElements = value;
        return o;
    },

    combine: function (selector1, combinator, selector2) {
        var o = Object.assign({}, this);
        if (!o.hasOwnProperty('combines')) {
            o.combines = [];
        }
        o.combines.push(selector1.stringify() + ' ' + combinator + ' ' + selector2.stringify());
        return o;
    },

    stringify: function () {
        var strResult = '';
        if (this.hasOwnProperty('elem')) {
            strResult += this.elem;
        }
        if (this.hasOwnProperty('idValue')) {
            strResult += '#' + this.idValue;
        }
        if (this.hasOwnProperty('classes')) {
            for (var i = 0; i < this.classes.length; i++) {
                strResult += '.' + this.classes[i];
            }

        }
        if (this.hasOwnProperty('attributties')) {
            for (var i = 0; i < this.attributties.length; i++) {
                strResult += '[' + this.attributties[i] + ']';
            }

        }
        if (this.hasOwnProperty('pseudoClasses')) {
            for (var i = 0; i < this.pseudoClasses.length; i++) {
                strResult += ':' + this.pseudoClasses[i];
            }

        }
        if (this.hasOwnProperty('pseudoElements')) {
                strResult += '::' + this.pseudoElements;
        }
        if (this.hasOwnProperty('combines')) {
            for (var i = 0; i < this.combines.length; i++) {
                strResult += this.combines[i];
            }

        }
        return strResult;
    }

};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
