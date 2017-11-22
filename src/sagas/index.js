import { fork, takeEvery, select, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { resultLoaded } from '../actions/app.actions';

export const selectInputString = state => state.testString;

export function *loadProcessedResult() {
    const postfix = yield select(selectInputString);

    try {
        const { data } = yield call(axios.get, `evaluate-postfix?postfix=${encodeURIComponent(postfix)}`);

        const result = Number(data.result);

        if (isNaN(result)) {
            throw new Error('invalid result');
        }

        yield put(resultLoaded({ result }));
    }
    catch (err) {
        yield put(resultLoaded({ err }));
    }
}

export function *watchLoad() {
    yield takeEvery('LOAD_INITIATED', loadProcessedResult);
}

export default function *rootSaga() {
    yield fork(watchLoad);
}

