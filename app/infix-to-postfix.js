const { OPERATORS, PRECEDENCE } = require('./operators');

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
    const stacks = chars
        .reduce(({ items, ops, continueNumber }, char, index) => {
            const whitespace = Boolean(typeof char === 'string' && char.match(/\s/));
            if (whitespace) {
                return { items, ops, continueNumber: false };
            }

            const isBracket = char === BRACKET;
            if (isBracket) {
                return {
                    items: [...items, { char, type: TYPE_GROUP }],
                    ops,
                    continueNumber: false
                };
            }

            const isOperator = index > 0 && index < chars.length - 1 && char in OPERATORS &&
                !(chars[index - 1] in OPERATORS) && chars[index + 1].match(/\s/);

            if (isOperator) {
                const popAndPrint = ops.length && PRECEDENCE[ops[ops.length - 1].char] < PRECEDENCE[char];

                const operator = { char, type: TYPE_OPERATOR };

                if (popAndPrint) {
                    return {
                        items: [...items, ops.pop()],
                        ops: [...ops, operator],
                        continueNumber: false
                    };
                }

                return {
                    items,
                    ops: [...ops, operator],
                    continueNumber: false
                };
            }

            if (continueNumber) {
                return {
                    items: [...items.slice(0, items.length - 1), {
                        char: `${items[items.length - 1].char}${char}`,
                        type: TYPE_NUMBER
                    }],
                    ops,
                    continueNumber: true
                };
            }

            return {
                items: [...items, { char, type: TYPE_NUMBER }],
                ops,
                continueNumber: true
            };

        }, { items: [], ops: [], continueNumber: false });

    return [...stacks.items, ...stacks.ops.reverse()];
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
        .map(({ char }) => char)
        .join(' ')
        .replace(new RegExp(BRACKET, 'g'), () => {
            bracketIndex++;

            return infixToPostfix(infix.substring(
                bracketSections[bracketIndex].open + 1, bracketSections[bracketIndex].close
            ), level + 1);
        });
}

module.exports = infixToPostfix;

