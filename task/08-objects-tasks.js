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
    this.getArea = function(){
        return this.width*this.height;
    }
}


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
    elemValue:'',
    idValue:'',
    pseudoClasses:[],
    pseudoElements:[],
    classes:[],
    attributties:[],
    combElems:'',
    element: function(value) {
        this.elemValue = value;
        return this;
    },

    id: function(value) {
        this.idValue = value;
        return this;
    },

    class: function(value) {
        this.classes.push(value);
        return this;
    },

    attr: function(value) {
        this.attributties.push(value);
        return this;
    },

    pseudoClass: function(value) {
        this.pseudoClasses.push(value);
        return this;
    },

    pseudoElement: function(value) {
        this.pseudoElements.push(value);
        return this;
    },

    combine: function(selector1, combinator, selector2) {
        this.combElems = combinator+' '+selector2.stringify();
        return this;
    },
    stringify: function () {

        var tempStr='';
        if(this.elemValue!=''){
            tempStr+=this.elemValue;
        }

        if(this.idValue!==''){
            tempStr+='#'+this.idValue;
        }

        if(this.classes.length!==0){
            for(var i=0;i<this.classes.length;i++) {
                tempStr += '.' + this.classes[i];
            }
        }

        if(this.attributties.length!==0){
            tempStr +='[';
            for(var i=0;i<this.attributties.length;i++) {
                tempStr += (i==0?'':' ')+ this.attributties[i];
            }
            tempStr +=']';
        }
        if(this.pseudoClasses.length!==0){
            for(var i=0;i<this.pseudoClasses.length;i++) {
                tempStr += ':' + this.pseudoClasses[i];
            }
        }
        if(this.pseudoElements.length!==0){
            for(var i=0;i<this.pseudoElements.length;i++) {
                tempStr += '::' + this.pseudoElements[i];
            }
        }
        this.elemValue='';
        this.idValue='';
        this.pseudoClasses=[];
        this.pseudoElements=[];
        this.classes=[];
        this.attributties=[];
        if(this.combElems!=='') {
            var temp = this.combElems;
            this.combElems='';
            return tempStr + ' ' + temp;
        }
        return tempStr;
    }
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
