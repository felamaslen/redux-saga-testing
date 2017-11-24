import { fork, takeEvery, select, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { resultLoaded } from './actions';

export const selectInputString = {
    postfix: state => state.testString.postfix,
    infix: state => state.testString.infix
};

export function *loadProcessedResult({ category }) {
    const raw = yield select(selectInputString[category]);

    try {
        const { data } = yield call(axios.get, `evaluate-${category}?${category}=${encodeURIComponent(raw)}`);

        const result = Number(data.result);

        if (isNaN(result)) {
            throw new Error('invalid result');
        }

        yield put(resultLoaded({ category, result }));
    }
    catch (err) {
        yield put(resultLoaded({ category, err: err.message }));
    }
}

export default function *rootSaga() {
    yield fork(function *watchLoadResult() {
        yield takeEvery('LOAD_INITIATED', loadProcessedResult);
    });
}

