import { connect } from 'react-redux';

import { inputChanged, loadInitiated } from '../../actions';

import React from 'react';
import PropTypes from 'prop-types';

import ResultsList from '../../components/results-list';
import InputGroup from '../../components/input-group';

import './style.scss';

export function SagaTesting({ input, history, result, error, onChange, onLoad }) {
    return <div className="saga-testing-outer">
        <ResultsList history={history} />
        <InputGroup onChange={onChange} onLoad={onLoad}
            error={error} value={input} result={result}
        />
    </div>;
}

SagaTesting.propTypes = {
    input: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
    result: PropTypes.number,
    error: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    input: state.input,
    history: state.history,
    result: state.result,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    onChange: evt => dispatch(inputChanged(evt.target.value)),
    onLoad: () => dispatch(loadInitiated())
});

export default connect(mapStateToProps, mapDispatchToProps)(SagaTesting);

