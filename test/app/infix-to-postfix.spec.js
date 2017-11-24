const { expect } = require('chai');
const infixToPostfix = require('../../app/infix-to-postfix');

describe('Infix to Postfix converter', () => {
    it('should work as expected', () => {
        expect(infixToPostfix('2 + 3 * (5 / 2)')).to.equal('2 3 + 5 2 / *');
        expect(infixToPostfix('21 * -3.2')).to.equal('21 -3.2 *');
        expect(infixToPostfix('(21 * -3.2) / (5 - 1)')).to.equal('21 -3.2 * 5 1 - /');
        expect(infixToPostfix('((3.2 * 5) * (-20 / -3))')).to.equal('3.2 5 * -20 -3 / *');
    });
});

