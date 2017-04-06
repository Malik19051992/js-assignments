'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {

    return !!(function find (startPosition, toFind, puzzleToFind) {
        if(!startPosition){
            let i =0;
            let j =0;
            let firstLetter = -1;
            while(true){
                firstLetter = puzzleToFind[i].indexOf(toFind[0],firstLetter+1);
                if(firstLetter===-1){
                    i++;
                }else{
                    const temp =Array.prototype.slice.call(puzzleToFind);
                    temp[i]= temp[i].slice(0,firstLetter)+' '+temp[i].slice(firstLetter+1);
                    if(find([i,firstLetter],toFind.slice(1),temp ))
                        return true;
                }
                if(i===puzzleToFind.length){
                    return false;
                }
            }
        }else{
            let findLet ='';
            if(toFind!==''){
                findLet = toFind[0];
                toFind = toFind.slice(1);
            }else{
                return true;
            }
            if(startPosition[1]<puzzleToFind[startPosition[0]].length-1)
                if(puzzleToFind[startPosition[0]][startPosition[1]+1]===findLet){
                    const temp = Array.prototype.slice.call(puzzleToFind);
                    temp[startPosition[0]]= temp[startPosition[0]].slice(0,startPosition[1]+1)+' '+temp[startPosition[0]].slice(startPosition[1]+2);
                    return find([startPosition[0],startPosition[1]+1],toFind,temp)
                }
            if(startPosition[1]>0)
                if(puzzleToFind[startPosition[0]][startPosition[1]-1]===findLet){
                    const temp = Array.prototype.slice.call(puzzleToFind);
                    temp[startPosition[0]]= temp[startPosition[0]].slice(0,startPosition[1]-1)+' '+temp[startPosition[0]].slice(startPosition[1]);
                    return find([startPosition[0],startPosition[1]-1],toFind,temp)
                }
            if(startPosition[0]<puzzleToFind.length-1)
                if(puzzleToFind[startPosition[0]+1][startPosition[1]]===findLet){
                    const temp = Array.prototype.slice.call(puzzleToFind);
                    temp[startPosition[0]+1]= temp[startPosition[0]+1].slice(0,startPosition[1])+' '+temp[startPosition[0]+1].slice(startPosition[1]+1);
                    return find([startPosition[0]+1,startPosition[1]],toFind,temp)
                }
            if(startPosition[0]>0)
                if(puzzleToFind[startPosition[0]-1][startPosition[1]]===findLet){
                    const temp = Array.prototype.slice.call(puzzleToFind);
                    temp[startPosition[0]-1]= temp[startPosition[0]-1].slice(0,startPosition[1])+' '+temp[startPosition[0]-1].slice(startPosition[1]+1);
                    return find([startPosition[0]-1,startPosition[1]],toFind,temp)
                }
        }
    })(null,searchStr,puzzle);


}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {

    function getAllWords(str){
        var result = [];
        if(str.length==1){
            result.push(str);
            return result;
        }else if(str.length==2){
            result.push(str[0]+str[1]);
            result.push(str[1]+str[0]);
            return result;
        }
        else{
            for(var i=0;i<str.length;i++){
                var char = str[i];
                var arrayWords = getAllWords(str.slice(0,i)+(i+1<str.length? str.slice(i+1):''));
                for(var j=0;j<arrayWords.length;j++){
                    result.push(char+arrayWords[j]);
                }
            }
            return result;
        }
    }

    var arr = getAllWords(chars);
    for(var i =0;i<arr.length;i++){
        yield arr[i];
    }
    return;

}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let summOfSale = 0;
    let startToBuy = 0;
    while(startToBuy<quotes.length){
        let max = quotes[startToBuy];
        let indexMax =startToBuy;
        for(let i = startToBuy;i<quotes.length;i++){
            if(max<quotes[i]){
                max = quotes[i];
                indexMax = i;
            }
        }
        while (startToBuy<indexMax){
            summOfSale+=quotes[indexMax] - quotes[startToBuy];
            startToBuy++;
        }
        startToBuy++;
    }
    return summOfSale;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        throw new Error('Not implemented');
    },
    
    decode: function(code) {
        throw new Error('Not implemented');
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
