import { expect } from 'chai';
import * as A from '../src/actions';

describe('Actions', () => {
    describe('inputChanged', () => {
        it('should return INPUT_CHANGED with value', () => {
            expect(A.inputChanged('postfix', 'foo')).to.deep.equal({ type: 'INPUT_CHANGED', category: 'postfix', value: 'foo' });
        });
    });

    describe('loadInitiated', () => {
        it('should return LOAD_INITIATED', () => {
            expect(A.loadInitiated('postfix')).to.deep.equal({ type: 'LOAD_INITIATED', category: 'postfix' });
        });
    });

    describe('resultLoaded', () => {
        it('should return RESULT_LOADED with response', () => {
            expect(A.resultLoaded({ foo: 'bar', bar: 'baz' })).to.deep.equal({
                type: 'RESULT_LOADED',
                foo: 'bar',
                bar: 'baz'
            });
        });
    });
});

