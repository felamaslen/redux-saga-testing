import { connect } from 'react-redux';

import { inputChanged, loadInitiated } from '../../actions';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

export function SagaTesting({ testString, result, error, onChange, onLoad }) {
    const inputClasses = classNames({
        'saga-testing-input': true,
        error
    });

    const displayedResult = error
        ? 'Invalid postfix string!'
        : `Result: ${result || ''}`;

    return <div className="saga-testing-outer">
        <span className="input-outer">
            <label>{'Input a postfix expression here:'}</label>
            <input className={inputClasses} value={testString} onChange={onChange} />
        </span>
        <button className="saga-testing-submit-button" onClick={onLoad}>{'Load'}</button>
        <span className="saga-testing-result">
            {displayedResult}
        </span>
    </div>;
}

SagaTesting.propTypes = {
    testString: PropTypes.string.isRequired,
    result: PropTypes.number,
    error: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    testString: state.testString,
    result: state.result,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    onChange: evt => dispatch(inputChanged(evt.target.value)),
    onLoad: () => dispatch(loadInitiated())
});

export default connect(mapStateToProps, mapDispatchToProps)(SagaTesting);

