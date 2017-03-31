'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */

function parseBankAccount(bankAccount) {
    function getNumber(arr) {
        if (arr[0][1] === ' ') {
            if (arr[1][1] === '_') {
                return 4;
            } else {
                return 1;
            }
        } else {
            if (arr[1][0] === ' ') {
                if (arr[2][0] === '|') {
                    return 2;
                } else if (arr[1][1] === '_') {
                    return 3
                } else {
                    return 7;
                }
            } else {
                if (arr[1][2] === ' ') {
                    if (arr[2][0] === ' ') {
                        return 5;
                    }
                    else {
                        return 6;
                    }
                } else {
                    if (arr[2][0] === ' ') {
                        return 9;
                    }
                    else if (arr[1][1] === '_') {
                        return 8;
                    } else {
                        return 0;
                    }
                }
            }
        }

    }

    var arrStrs = bankAccount.split('\n');
    var resultStr = '';
    for (var i = 0; i < arrStrs[0].length; i++) {
        var oneNumber = [];
        //if(bankAccount[i]===' '&&bankAccount[i+1]!==' '&&bankAccount[i+1]!=='\n'){
        oneNumber.push(arrStrs[0].slice(i, i + 3));
        oneNumber.push(arrStrs[1].slice(i, i + 3));
        oneNumber.push(arrStrs[2].slice(i, i + 3));
        i += 2;
        /*} else if(bankAccount[i]===' '&&bankAccount[i+1]!=='\n'){
         oneNumber.push(arrStrs[0][i]);
         oneNumber.push(arrStrs[1][i]);
         oneNumber.push(arrStrs[2][i]);
         } else if(bankAccount[i]===' '&&bankAccount[i+1]===' '&&bankAccount[i+2]!==' '){
         oneNumber.push(arrStrs[0][i]);
         oneNumber.push(arrStrs[1][i]);
         oneNumber.push(arrStrs[2][i]);
         }else{
         oneNumber.push(arrStrs[0].slice(i,i+3));
         oneNumber.push(arrStrs[1].slice(i,i+3));
         oneNumber.push(arrStrs[2].slice(i,i+3));
         i+=2;
         }*/
        resultStr += getNumber(oneNumber);
    }
    return resultStr;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    var arrayWords = text.split(' ');
    var arrayColumns = [];
    var row = '';
    for (var i = 0; i < arrayWords.length; i++) {
        if (row.length + 1 + arrayWords[i].length <= columns) {
            row += row === '' ? arrayWords[i] : ' ' + arrayWords[i];
        } else {
            arrayColumns.push(row);
            row = arrayWords[i];
        }
    }
    arrayColumns.push(row);

    for (var i = 0; i < arrayColumns.length; i++) {
        yield arrayColumns[i];
    }
    return
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    function card(number, suit) {
        this.number = number;
        this.suit = suit;
    }

    function getNumberOfCard(a) {
        switch (a) {
            case '2':
                return 2;
            case '3':
                return 3;
            case '4':
                return 4;
            case '5':
                return 5;
            case '6':
                return 6;
            case '7':
                return 7;
            case '8':
                return 8;
            case '9':
                return 9;
            case '10':
                return 10;
            case 'J':
                return 11;
            case 'Q':
                return 12;
            case 'K':
                return 13;
            case 'A':
                return 14;
        }
    }

    var arrayOfCards = [];
    for (var i = 0; i < hand.length; i++) {
        var t = parseInt(hand[i], 10);
        if (isNaN(t)) {
            t = hand[i][0];
        }
        arrayOfCards.push(new card(t.toString(), hand[i][hand[i].length - 1]));
    }

    arrayOfCards.sort(function (a, b) {
        if (getNumberOfCard(a.number) > getNumberOfCard(b.number)) return 1;
        else return -1;
    });

    function ifStraight() {
        if (getNumberOfCard(arrayOfCards[0].number) === 2 && getNumberOfCard(arrayOfCards[4].number) === 14) {
            for (var i = 1; i < 4; i++) {
                if (getNumberOfCard(arrayOfCards[i].number) !== getNumberOfCard(arrayOfCards[i - 1].number) + 1) {
                    return false;
                }
            }
            return true;
        } else {
            for (var i = 1; i < 5; i++) {
                if (getNumberOfCard(arrayOfCards[i].number) !== getNumberOfCard(arrayOfCards[i - 1].number) + 1) {
                    return false;
                }
            }
            return true;
        }
    }

    function isFalsh() {
        for (var i = 1; i < 5; i++) {
            if (arrayOfCards[i].suit !== arrayOfCards[i - 1].suit) {
                return false;
            }
        }
        return true;
    }

    function groupCards() {
        var newArrayCards = arrayOfCards.map(function (item, i) {
            return item;
        });
        var resultArray = [];

        while (newArrayCards.length > 0) {
            var t = newArrayCards.shift().number;
            var flag = false;
            for (var i = 0; i < resultArray.length; i++) {
                if (resultArray[i][0] === t) {
                    resultArray[i][1]++;
                    flag = true;
                }
            }
            if (!flag) {
                var newValue = [];
                newValue[0] = t;
                newValue[1] = 1;
                resultArray.push(newValue);
            }
        }
        return resultArray;
    }

    var groupedCards = groupCards();

    if (ifStraight() && isFalsh()) {
        return PokerRank.StraightFlush;
    }

    if (groupedCards[0][1] === 4 || groupedCards[1][1] === 4) {
        return PokerRank.FourOfKind;
    }
    if ((groupedCards[0][1] === 2 && groupedCards[1][1] === 3) || groupedCards[0][1] === 3 && groupedCards[1][1] === 2) {
        return PokerRank.FullHouse;
    }
    if (isFalsh()) {
        return PokerRank.Flush;
    }
    if (ifStraight()) {
        return PokerRank.Straight;
    }
    if (groupedCards.length > 2)
        if (groupedCards[0][1] === 3 || groupedCards[1][1] === 3 || groupedCards[2][1] === 3) {
            return PokerRank.ThreeOfKind;
        }
    if (groupedCards.length > 2)
        if ((groupedCards[0][1] === 2 && groupedCards[1][1] === 2) || groupedCards[1][1] === 2 && groupedCards[2][1] === 2 || groupedCards[0][1] === 2 && groupedCards[2][1] === 2) {
            return PokerRank.TwoPairs;
        }

    if (groupedCards.length > 3)
        if (groupedCards[0][1] === 2 || groupedCards[1][1] === 2 || groupedCards[2][1] === 2 || groupedCards[3][1] === 2) {
            return PokerRank.OnePair;
        }
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    var arrayOfRow = figure.split('\n');
    var arrayOfFigures = [];
    for (var i = 0; i < arrayOfRow.length; i++) {
        var noPair = false;
        var temp;
        for (var j = 0; j < arrayOfRow[i].length; j++) {
            if (arrayOfRow[i][j] === '+') {
                if (i < arrayOfRow.length - 1) {
                    if (arrayOfRow[i + 1][j] === '|') {
                        if (!noPair) {
                            temp = [i, j];
                            noPair = true;
                        } else {
                            for (var k = i + 1; k < arrayOfRow.length; k++) {
                                if (arrayOfRow[k][j] === '+') {
                                    var oneFigure = [[], []];
                                    oneFigure[0][0] = temp[0];
                                    oneFigure[0][1] = temp[1];
                                    oneFigure[1][0] = k;
                                    oneFigure[1][1] = j;
                                    arrayOfFigures.push(oneFigure);
                                    temp = [];
                                    noPair = false;
                                    break;
                                }
                            }
                            if (j < arrayOfRow[i].length && arrayOfRow[i][j + 1] === '-') {
                                temp = [i, j];
                                noPair = true;
                            }
                        }
                    }
                }
            }
        }
    }
    var resultArray = [];
    for (var i = 0; i < arrayOfFigures.length; i++) {
        var resultRow = '';
        for (j = arrayOfFigures[i][0][0]; j <= arrayOfFigures[i][1][0]; j++) {
            for (k = arrayOfFigures[i][0][1]; k <= arrayOfFigures[i][1][1]; k++) {
                if ((j === arrayOfFigures[i][0][0] || j === arrayOfFigures[i][1][0]) && (k === arrayOfFigures[i][0][1] || k === arrayOfFigures[i][1][1])) {
                    resultRow += '+';
                } else if (j === arrayOfFigures[i][0][0] || j === arrayOfFigures[i][1][0]) {
                    resultRow += '-';
                } else if (k === arrayOfFigures[i][0][1] || k === arrayOfFigures[i][1][1]) {
                    resultRow += '|';
                }
                else {
                    resultRow += ' ';
                }
            }
            resultRow += '\n';
        }
        resultArray.push(resultRow);
    }
    for (var i = 0; i < resultArray.length; i++) {
        yield resultArray[i];
    }
    return
}


module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
