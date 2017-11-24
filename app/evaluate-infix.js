const infixToPostfix = require('./infix-to-postfix');
const evaluatePostfix = require('./evaluate-postfix');

function evaluateInfix(raw) {
    const postfix = infixToPostfix(raw);

    const result = evaluatePostfix(postfix);

    if (result === null || isNaN(result)) {
        throw new Error('invalid string');
    }

    return result;
}

module.exports = evaluateInfix;

