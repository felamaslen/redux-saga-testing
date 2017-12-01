const OPERATORS = {
    '*': (arg1, arg2) => arg1 * arg2,
    '/': (arg1, arg2) => arg1 / arg2,
    '+': (arg1, arg2) => arg1 + arg2,
    '-': (arg1, arg2) => arg1 - arg2
}

const PRECEDENCE = {
    '*': 0,
    '/': 0,
    '+': 1,
    '-': 1
};

module.exports = { OPERATORS, PRECEDENCE };

