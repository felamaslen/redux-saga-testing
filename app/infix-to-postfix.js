const operators = require('./operators');

const BRACKET = 0xB00000;

const TYPE_NUMBER = 'NUMBER';
const TYPE_OPERATOR = 'OPERATOR';
const TYPE_GROUP = 'GROUP';

function getBracketSections(infix) {
    return infix
        .split('')
        .reduce((sections, char, index) => {
            if (char === '(') {
                const remove = index > 0 && sections.findIndex(section => section.close === null) > -1;

                return [...sections, { open: index, close: null, remove }];
            }
            if (char === ')') {
                const lastNotClosed = sections
                    .slice()
                    .reverse()
                    .findIndex(section => section.close === null);

                if (lastNotClosed === -1) {
                    throw new Error('invalid brackets');
                }

                const closeIndex = sections.length - 1 - lastNotClosed;

                sections[closeIndex].close = index;
            }

            return sections;

        }, [])
        .filter(section => !section.remove);
}

function getCharsWithBrackets(bracketSections, infix) {
    if (bracketSections.length > 0) {
        return bracketSections
            .reduce(({ items, start }, { open, close }) => ({
                items: [
                    ...items,
                    ...infix.substring(start, open)
                        .split(''),
                    BRACKET
                ],
                start: close + 1
            }), {
                items: [],
                start: 0
            })
            .items;
    }

    return infix.split('');
}

function processCharsWithBrackets(chars) {
    return chars
        .reduce((items, char, index) => {
            const whitespace = Boolean(typeof char === 'string' && char.match(/\s/));
            if (whitespace) {
                return items;
            }

            const isBracket = char === BRACKET;
            if (isBracket) {
                return [...items, { char, type: TYPE_GROUP }];
            }

            const isOperator = index > 0 && index < chars.length - 1 && char in operators &&
                !(chars[index - 1] in operators) && chars[index + 1].match(/\s/);

            if (isOperator) {
                return [...items, { char, type: TYPE_OPERATOR }];
            }

            const continueNumber = index > 0 && items[items.length - 1].type === TYPE_NUMBER;
            if (continueNumber) {
                return [...items.slice(0, items.length - 1), {
                    char: `${items[items.length - 1].char}${char}`,
                    type: TYPE_NUMBER
                }];
            }

            return [...items, { char, type: TYPE_NUMBER }];

        }, []);
}

function infixToPostfix(infix = '2 + 3 * (5 / 2)', level = 0) {
    const bracketSections = getBracketSections(infix);

    const invalidBrackets = bracketSections.length && bracketSections[bracketSections.length - 1].close === null;
    if (invalidBrackets) {
        throw new Error('invalid string');
    }

    const chars = getCharsWithBrackets(bracketSections, infix);

    const bits = processCharsWithBrackets(chars);

    let bracketIndex = -1;

    return bits
        .reduce(({ stack, skip }, { char, type }, index) => {
            if (skip) {
                return { stack, skip: false };
            }

            if (type === TYPE_OPERATOR) {
                return {
                    stack: [...stack, bits[index + 1].char, char],
                    skip: true
                };
            }

            return {
                stack: [...stack, char],
                skip
            };

        }, {
            stack: [],
            skip: false
        })
        .stack
        .join(' ')
        .replace(new RegExp(BRACKET, 'g'), () => {
            bracketIndex++;

            return infixToPostfix(infix.substring(
                bracketSections[bracketIndex].open + 1, bracketSections[bracketIndex].close
            ), level + 1);
        });
}

module.exports = infixToPostfix;

