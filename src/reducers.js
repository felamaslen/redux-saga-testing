import { createReducer } from 'redux-create-reducer';

import initialState from './store/initial-state';

export function changeInputValue(state, { category, value }) {
    return {
        ...state,
        testString: {
            ...state.testString,
            [category]: value
        }
    };
}

export function loadResult(state, { category, result, err }) {
    if (err) {
        return {
            ...state,
            result: {
                ...state.result,
                [category]: null
            },
            error: category
        };
    }

    return {
        ...state,
        result: {
            ...state.result,
            [category]: result
        },
        error: false
    };
}

export default createReducer(initialState, {
    'INPUT_CHANGED': (state, action) => changeInputValue(state, action),
    'RESULT_LOADED': (state, action) => loadResult(state, action)
});

