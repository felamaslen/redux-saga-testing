import { createReducer } from 'redux-create-reducer';

import initialState from '../store/initial-state';

function loadResult(state, { result, err }) {
    if (err) {
        return {
            ...state,
            result: null,
            error: true
        };
    }

    return {
        ...state,
        result,
        error: false
    };
}

export default createReducer(initialState, {
    'INPUT_CHANGED': (state, { value }) => ({ ...state, testString: value }),
    'RESULT_LOADED': (state, action) => loadResult(state, action)
});

