import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function InputGroup({ category, onChange, onLoad, errorValue, value, result }) {
    const error = errorValue === category;

    const inputClasses = classNames({
        'saga-testing-input': true,
        error
    });

    const displayedResult = error
        ? `Invalid ${category} string!`
        : `Result: ${result[category] || ''}`;

    return <div className="input-group-outer">
        <span className="input-outer">
            <label>{'Input a '}{category}{' expression here:'}</label>
            <input className={inputClasses} value={value[category]} onChange={onChange(category)} />
        </span>
        <button className="saga-testing-submit-button" onClick={onLoad(category)}>{'Load'}</button>
        <span className="saga-testing-result">
            {displayedResult}
        </span>
    </div>;
}

InputGroup.propTypes = {
    category: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    errorValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]).isRequired,
    value: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired
};

