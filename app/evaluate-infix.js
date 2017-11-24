const infixToPostfix = require('./infix-to-postfix');
const evaluatePostfix = require('./evaluate-postfix');

function evaluateInfix(raw) {
    const postfix = infixToPostfix(raw);

    return evaluatePostfix(postfix);
}

module.exports = evaluateInfix;

