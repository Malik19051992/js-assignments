'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    function elem(abbreviation, azimuth) {
        this.abbreviation = abbreviation;
        this.azimuth = azimuth;
    }

    var sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!
    var result = [];
    var baseValue = 11.25;
    var currentValueAzimuth = 0;

    //алгоритм автоматической генерации сложный пипец. проще так сделать
    result.push(new elem('N', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NbE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NNE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NEbN', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NEbE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('ENE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('EbN', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('E', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('EbS', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('ESE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SEbE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SEbS', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SSE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SbE', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('S', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SbW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SSW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SWbS', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('SWbW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('WSW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('WbS', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('W', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('WbN', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('WNW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NWbW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NWbN', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NNW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    result.push(new elem('NbW', currentValueAzimuth));
    currentValueAzimuth += baseValue;
    return result;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {

}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    if(n===0){
        return [0];
    }
    if(n===1){
        return [1];
    }
    var result = [];
    for (var i = 0; i < n; i++) {
        result[i] = [];
    }
    var flagAverage = false;
    var number = 0;
    result[0][0] = number++;
    var i = 0, j = 1;
    var x = -1, y = 1;
    while (!(i === n - 1 && j === n - 1)) {
        //debugger;

        result[i][j] = number++;
        i+=y;
        j+=x;
        if(j<0){
           j++;
           x*=-1;
           y*=-1;
        }
        if(j>n-1){
            j--;
            x*=-1;
            y*=-1;
            if(flagAverage){
                i+=2;
            }
            if(n%2===1&&i===-1){
                i+=2;
                flagAverage= true;
            }

        }
        if(i<0){
            i++;
            y*=-1;
            x*=-1;
        }
        if(i>n-1){
            i--;
            y*=-1;
            x*=-1;
            if(flagAverage){
                j+=2;
            }
            if(n%2===0&&j===0){
                j++;
                flagAverage = true;
            }
        }
        if(number>n*n)break;
    }
    result[n-1][n-1] = number++;
    return result;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    var countWithoutPair = 0;
    var allDominoesNumbers = [];
    var dominoesSameNumber = [];
    for (var i = 0; i < dominoes.length; i++) {
        if (dominoes[i][0] === dominoes[i][1]) {
            dominoesSameNumber.push(dominoes[i][0]);
        } else {
            allDominoesNumbers.push(dominoes[i][0]);
            allDominoesNumbers.push(dominoes[i][1]);
        }
    }
    for (var i = 0; i < dominoesSameNumber.length; i++) {
        if (allDominoesNumbers.indexOf(dominoesSameNumber[i]) === -1) {
            return false;
        }
    }
    while (allDominoesNumbers.length > 0) {
        var t = allDominoesNumbers.shift();
        var k = allDominoesNumbers.indexOf(t);
        if (k == -1) {
            countWithoutPair++;
            if (countWithoutPair > 2)
                return false;
        }
        else {
            allDominoesNumbers.splice(k, 1);
        }

    }
    return true;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    var start;
    var numStart;
    var resultStr = '';
    start = nums[0];
    numStart = 0;
    resultStr = nums[0];
    for (var i = 1; i < nums.length; i++) {
        if (start + i - numStart !== nums[i] && i !== nums.length - 1) {
            if (i - numStart === 1) {
                if (resultStr !== '') {
                    resultStr += ',';
                }
                resultStr += nums[i];
            } else if (i - numStart === 2) {
                resultStr += ',' + nums[i - 1] + ',' + nums[i];
            } else {
                resultStr += '-' + nums[i - 1] + ',' + nums[i];
            }
            start = nums[i];
            numStart = i;
        }
        if (i === nums.length - 1) {
            if (i > 1 && nums[i] === nums[i - 1] + 1 && nums[i] === nums[i - 2] + 2) {
                resultStr += '-' + nums[i];
            } else if (i > 1 && nums[i] === nums[i - 1] + 1 && nums[i] !== nums[i - 2] + 2) {
                resultStr += ',' + nums[i];
            }
            else {
                resultStr += '-' + nums[i - 1] + ',' + nums[i];
            }
        }
    }
    return resultStr;
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};
