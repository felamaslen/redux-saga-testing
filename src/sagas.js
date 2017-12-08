import { fork, takeEvery, select, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { resultLoaded } from './actions';

export const selectInputString = state => state.input;

export function *loadProcessedResult() {
    const raw = yield select(selectInputString);

    try {
        const { data } = yield call(axios.get, `evaluate-infix?infix=${encodeURIComponent(raw)}`);

        const result = Number(data.result);

        if (isNaN(result)) {
            throw new Error('invalid result');
        }

        yield put(resultLoaded({ result }));
    }
    catch (err) {
        yield put(resultLoaded({ err: err.message }));
    }
}

export default function *rootSaga() {
    yield fork(function *watchLoadResult() {
        yield takeEvery('LOAD_INITIATED', loadProcessedResult);
    });
}

