import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

function getDisplayedResult(error, result) {
    if (error) {
        return 'Invalid input! (Must be infix string)';
    }

    if (result === null) {
        return '';
    }

    return `Result: ${result}`;
}

export default function InputGroup({ onChange, onLoad, error, value, result }) {
    const inputClasses = classNames({
        'saga-testing-input': true,
        error
    });

    return <div className="input-group-outer">
        <span className="input-outer">
            <label>{'Input an infix expression here:'}</label>
            <input className={inputClasses} value={value} onChange={onChange} />
        </span>
        <button className="saga-testing-submit-button" onClick={onLoad}>{'Load'}</button>
        <span className="saga-testing-result">
            {getDisplayedResult(error, result)}
        </span>
    </div>;
}

InputGroup.propTypes = {
    onChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    result: PropTypes.number
};

