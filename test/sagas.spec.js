/**
 * Saga testing 0: "native" testing of generator functions
 */

import { expect } from 'chai';
import { select, call, put } from 'redux-saga/effects';
import * as sagas from '../src/sagas';
import axios from 'axios';

describe('Sagas - test type 0 (native)', () => {
    describe('selectInputString', () => {
        it('should get testString from state', () => {
            expect(sagas.selectInputString({ testString: 'foo', foo: 'bar' })).to.equal('foo');
        });
    });

    describe('loadProcessedResult', () => {

        /**
         * The way we test sagas here is a multi-step process:
         * (1) create an instance of the saga, which is a generator function
         * (2) call next() on this instance, which causes it to run to the first yield
         *      - we do this for the number of steps applicable to the current test
         *      - the parameter of each next() call is an example of what each asynchronous step
         *          should yield
         * (3) assert on the generator's value
         */

        let gen = null;
        beforeEach(() => {
            // create an instance of the generator function before each test
            gen = sagas.loadProcessedResult();
        });

        it('should select the test string from state', () => {
            // call next() once to run the saga
            const result = gen.next();

            // assert that something was done
            expect(result.value).to.deep.equal(select(sagas.selectInputString));

            // call next() and assert that the saga is not done
            expect(gen.next().done).to.equal(false)
        });

        it('should call the API with the encoded string', () => {
            // call next() once to run the saga
            gen.next();

            // call next() with an example of what the previous test should yield
            // this will go to the next step in the generator function, *as if* this test value
            // was returned by the first asynchronous step
            const result = gen.next('3 2 + 5 /');

            // assert on the next yield from the saga
            expect(result.value).to.deep.equal(call(axios.get, 'evaluate-postfix?postfix=3%202%20%2B%205%20%2F'));

            // call next() and assert that the saga is not done
            expect(gen.next().done).to.equal(false)
        });

        it('should dispatch an action with the result, if it was valid', () => {
            // call next() once to run the saga
            gen.next();

            // call next() again to simulate the result of the select() call
            gen.next('3 2 + 5 /');

            // call next() again to simulate the result of the API call
            const result = gen.next({ data: { result: 1 } });

            // assert on the next yield from the saga - it should be an action dispatch
            expect(result.value).to.deep.equal(put({ type: 'RESULT_LOADED', result: 1 }));

            // call next() and assert that the saga is done
            expect(gen.next().done).to.equal(true)
        });

        // see if you can understand what the below code does - it's the same principles as the above :)
        it('should dispatch an error action if the input was invalid', () => {
            gen.next();

            gen.next('foobar');

            // simulate the throwing of an error
            const result = gen.throw(new Error('something bad happened'));

            expect(result.value).to.deep.equal(put({ type: 'RESULT_LOADED', err: 'something bad happened' }));

            expect(gen.next().done).to.equal(true)
        });

        it('should dispatch an error action if the server returned bad data', () => {
            gen.next();

            gen.next('3 2 + 5 /');

            const result = gen.next({ data: { result: 'not-a-number' } });

            expect(result.value).to.deep.equal(put({ type: 'RESULT_LOADED', err: 'invalid result' }));

            expect(gen.next().done).to.equal(true)
        });
    });
});

