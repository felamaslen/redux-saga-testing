import { createReducer } from 'redux-create-reducer';

import initialState from './store/initial-state';

export const changeInputValue = (state, { value }) => ({
    ...state,
    input: value
});

export function loadResult(state, { result, err }) {
    if (err) {
        return {
            ...state,
            result: null,
            error: true
        };
    }

    return {
        ...state,
        error: false,
        history: [
            ...state.history,
            {
                input: state.input,
                result
            }
        ],
        result
    };
}

const reducers = [
    ['INPUT_CHANGED', changeInputValue],
    ['RESULT_LOADED', loadResult]
];

export default createReducer(
    initialState,
    reducers.reduce((red, [action, reducer]) => ({
        ...red,
        [action]: (state, payload) => reducer(state, payload)
    }), {})
);

