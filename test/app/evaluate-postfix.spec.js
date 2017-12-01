const { expect } = require('chai');
const evaluatePostfix = require('../../app/evaluate-postfix');

describe('Postfix evaluator', () => {
    it('should evaluate a postfix string', () => {
        expect(evaluatePostfix('1 2 3 + +')).to.equal(6);
        expect(evaluatePostfix('1 2 + 3 +')).to.equal(6);
    });
    it('should handle subtraction', () => {
        expect(evaluatePostfix('1 2 3 - +')).to.equal(0);
        expect(evaluatePostfix('1 2 - 3 +')).to.equal(2);
    });
    it('should handle multiplication', () => {
        expect(evaluatePostfix('1 2 3 * *')).to.equal(6);
        expect(evaluatePostfix('1 2 * 3 *')).to.equal(6);
        expect(evaluatePostfix('1 2 + 3 *')).to.equal(9);
    });
    it('should handle division', () => {
        expect(evaluatePostfix('1 2 3 / /')).to.equal(1.5);
        expect(evaluatePostfix('1 2 / 3 /')).to.equal(1 / 6);
        expect(evaluatePostfix('1 2 + 3 /')).to.equal(1);
    });
});

