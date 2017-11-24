import { connect } from 'react-redux';

import { inputChanged, loadInitiated } from '../../actions';

import React from 'react';
import PropTypes from 'prop-types';

import InputGroup from '../../components/input-group';

import './style.scss';

export function SagaTesting({ testString, result, error, onChange, onLoad }) {
    return <div className="saga-testing-outer">
        <InputGroup category="postfix" onChange={onChange} onLoad={onLoad}
            errorValue={error} value={testString} result={result}
        />
        <InputGroup category="infix" onChange={onChange} onLoad={onLoad}
            errorValue={error} value={testString} result={result}
        />
    </div>;
}

SagaTesting.propTypes = {
    testString: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired,
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    testString: state.testString,
    result: state.result,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    onChange: category => evt => dispatch(inputChanged(category, evt.target.value)),
    onLoad: category => () => dispatch(loadInitiated(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(SagaTesting);

