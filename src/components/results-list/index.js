import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default class ResultsList extends Component {
    constructor(props) {
        super(props);

        this.list = null;
    }
    componentDidUpdate() {
        this.list.scrollTo(0, this.list.scrollHeight);
    }
    render() {
        const results = this.props.history.map(({ input, result }, key) =>
            <li key={key} className="result-history-item">
                <span className="input">{input}</span>
                <span className="result">{result}</span>
            </li>
        );

        const listRef = list => {
            this.list = list;
        };

        return <ul ref={listRef} className="results-history">
            {results}
        </ul>;
    }
}

ResultsList.propTypes = {
    history: PropTypes.array.isRequired
};

