/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import '../../browser';
import React from 'react';
import { shallow } from 'enzyme';
import InputGroup from '../../../src/components/input-group';

describe('<InputGroup />', () => {
    let changed = null;
    let loaded = null;
    let props = null;

    beforeEach(() => {
        changed = null;
        loaded = null;

        props = {
            onChange: () => {
                changed = true;
            },
            onLoad: () => {
                loaded = true;
            },
            error: false,
            value: '3 * 5',
            result: 15
        };
    });

    it('should render its basic structure', () => {
        const wrapper = shallow(<InputGroup {...props} />);

        expect(wrapper.is('div.input-group-outer')).to.equal(true);
        expect(wrapper.children()).to.have.length(3);

        expect(wrapper.childAt(0).is('span.input-outer')).to.equal(true);
        expect(wrapper.childAt(1).is('button.saga-testing-submit-button')).to.equal(true);
        expect(wrapper.childAt(2).is('span.saga-testing-result')).to.equal(true);
    });

    describe('String input', () => {
        it('should be rendered', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(wrapper.childAt(0).children()).to.have.length(2);

            expect(wrapper.childAt(0).childAt(0).is('label')).to.equal(true);
            expect(wrapper.childAt(0).childAt(0).text()).to.equal('Input an infix expression here:');

            expect(wrapper.childAt(0).childAt(1).is('input.saga-testing-input')).to.equal(true);
        });
        it('should render an error class', () => {
            const wrapper = shallow(<InputGroup {...props} error={true} />);

            expect(wrapper.childAt(0).childAt(1).hasClass('error')).to.equal(true);
        });
        it('should base its value off the store', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(wrapper.childAt(0).childAt(1).props().value).to.equal('3 * 5');
        });
        it('should dispatch the correct action on change', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(changed).to.equal(null);

            wrapper.childAt(0).childAt(1).simulate('change', { target: { value: 'bar' } });

            expect(changed).to.equal(true);
        });
        it('should dispatch a load event when the enter key is pressed', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(loaded).to.equal(null);

            wrapper.childAt(0).childAt(1).simulate('keypress', { key: 'Enter' });

            expect(loaded).to.equal(true);
        });
    });

    describe('Load button', () => {
        it('should render its text', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(wrapper.childAt(1).text()).to.equal('Load');
        });
        it('should dispatch the correct action on click', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(loaded).to.equal(null);

            wrapper.childAt(1).simulate('click');

            expect(loaded).to.equal(true);
        });
    });

    describe('Result', () => {
        it('should be displayed', () => {
            const wrapper = shallow(<InputGroup {...props} />);

            expect(wrapper.childAt(2).text()).to.equal('Result: 15');
        });
        it('should display nothing if result is null', () => {
            const wrapper = shallow(<InputGroup {...props} result={null} />);

            expect(wrapper.childAt(2).text()).to.equal('');
        });
        it('should display an error if one occurred', () => {
            const wrapper = shallow(<InputGroup {...props} error={true} />);

            expect(wrapper.childAt(2).text()).to.equal('Invalid input! (Must be infix string)');
        });
    });
});

