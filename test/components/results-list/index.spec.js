/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import itEach from 'it-each';
itEach();
import '../../browser';
import { shallow } from 'enzyme';
import React from 'react';
import ResultsList from '../../../src/components/results-list';

describe('<ResultsList />', () => {
    const props = {
        history: [
            { input: 'foo', result: 'bar' },
            { input: 'baz', result: 'bak' }
        ]
    };

    let key = null;
    beforeEach(() => {
        key = 0;
    });
    afterEach(() => {
        key = null;
    });

    it('should render its basic structure', () => {
        const wrapper = shallow(<ResultsList {...props} />);

        expect(wrapper.is('ul.results-history')).to.equal(true);
        expect(wrapper.children()).to.have.length(2);
    });

    it.each(props.history, 'should render a list of results', ({ input, result }) => {
        const wrapper = shallow(<ResultsList {...props} />);

        expect(wrapper.childAt(key).is('li.result-history-item')).to.equal(true);
        expect(wrapper.childAt(key).children()).to.have.length(2);

        expect(wrapper.childAt(key).childAt(0).is('span.input')).to.equal(true);
        expect(wrapper.childAt(key).childAt(0).text()).to.equal(input);

        expect(wrapper.childAt(key).childAt(1).is('span.result')).to.equal(true);
        expect(wrapper.childAt(key).childAt(1).text()).to.equal(result);

        key++;
    });
});

