import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function ResultsList({ history }) {
    const results = history.map(({ input, result }, key) =>
        <li key={key} className="result-history-item">
            <span className="input">{input}</span>
            <span className="result">{result}</span>
        </li>
    );

    return <ul className="results-history">
        {results}
    </ul>;
}

ResultsList.propTypes = {
    history: PropTypes.array.isRequired
};

