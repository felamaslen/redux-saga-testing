/* eslint-disable id-length, new-cap */
import { expect } from 'chai';
import R from '../src/reducers';

describe('Reducers', () => {
    describe('INPUT_CHANGED', () => {
        it('should change testString in state', () => {
            expect(R(
                { testString: null, foo: 'bar' },
                { type: 'INPUT_CHANGED', value: 'baz' }
            ))
                .to.deep.equal({ testString: 'baz', foo: 'bar' });
        });
    });

    describe('RESULT_LOADED', () => {
        it('should insert the result into the state', () => {
            expect(R(
                { result: null, foo: 'bar' },
                { type: 'RESULT_LOADED', result: 10 }
            ))
                .to.deep.equal({ result: 10, error: false, foo: 'bar' });
        });

        it('should set error to true if an error occurred', () => {
            expect(R(
                { result: 10, error: false, foo: 'bar' },
                { type: 'RESULT_LOADED', err: 'something bad happened' }
            ))
                .to.deep.equal({ result: null, error: true, foo: 'bar' });
        });
    });
});

