/**
 * Saga testing 1: using redux-saga-test-plan helper function
 */

/* eslint-disable prefer-reflect */

import { testSaga } from 'redux-saga-test-plan';
import * as sagas from '../src/sagas';
import axios from 'axios';

describe('Sagas - test type 1 (using redux-saga-test-plan)', () => {
    describe('selectInputString', () => {
        it('was already tested in the native implementation', () => null);
    });

    describe('loadProcessedResult', () => {

        /**
         * Using redux-saga-test-plan makes testing sagas a lot less laborious,
         * in my opinion.
         * We do it like this:
         * (1) create an instance of testSaga(), using the saga to test as the parameter
         * (2) call next() on this instance when we want to step through the generator
         * (3) call API methods like .select(), .put(), .call() etc. to test that these
         *      are called by the saga
         * (4) call .isDone() to check that the saga is done
         *
         * This method of testing means we can test an entire saga in one simple chain of asserts.
         */

        it('should call the API and dispatch an action with the result', () => {
            testSaga(sagas.loadProcessedResult)
                // call next() once to run the saga
                .next()

                // assert on the first yield, which is a select to get stuff from state
                .select(sagas.selectInputString)

                // call next() with a simulated value resulting from the select() call
                .next('3 2 + 5 /')

                // assert on the second yield, which is an API call
                .call(axios.get, 'evaluate-postfix?postfix=3%202%20%2B%205%20%2F')

                // call next() with a simulated value resulting from the API call
                .next({ data: { result: 1 } })

                // assert on the third yield, which is a dispatch
                .put({ type: 'RESULT_LOADED', result: 1 })

                // call next() to simulate this yield
                .next()

                // assert that the saga is done
                .isDone();
        });

        it('should dispatch an error action if an error occurred', () => {
            testSaga(sagas.loadProcessedResult)
                .next()
                .select(sagas.selectInputString)
                .next('foobar')
                .call(axios.get, 'evaluate-postfix?postfix=foobar')
                .throw(new Error('something bad happened'))
                .put({ type: 'RESULT_LOADED', err: 'something bad happened' })
                .next()
                .isDone();

            testSaga(sagas.loadProcessedResult)
                .next()
                .select(sagas.selectInputString)
                .next('3 2 + 5 /')
                .call(axios.get, 'evaluate-postfix?postfix=3%202%20%2B%205%20%2F')
                .next({ data: { result: 'not-a-number' } })
                .put({ type: 'RESULT_LOADED', err: 'invalid result' })
                .next()
                .isDone();
        });
    });
});

