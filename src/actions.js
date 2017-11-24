export const inputChanged = (category, value) => ({ type: 'INPUT_CHANGED', category, value });

export const loadInitiated = category => ({ type: 'LOAD_INITIATED', category });

export const resultLoaded = res => ({ type: 'RESULT_LOADED', ...res });

