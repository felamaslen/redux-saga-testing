export const inputChanged = value => ({ type: 'INPUT_CHANGED', value });

export const loadInitiated = () => ({ type: 'LOAD_INITIATED' });

export const resultLoaded = res => ({ type: 'RESULT_LOADED', ...res });

