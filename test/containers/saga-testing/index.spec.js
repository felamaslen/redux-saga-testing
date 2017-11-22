/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import '../../browser';
import React from 'react';
import shallow from '../../shallow-with-store';
import { createMockStore } from 'redux-test-utils';
import SagaTesting from '../../../src/containers/saga-testing';

describe('<SagaTesting />', () => {
    it('should render its basic structure', () => {
        const wrapper = shallow(<SagaTesting />, createMockStore({
            testString: '',
            result: null,
            error: false
        })).dive();

        expect(wrapper.is('div.saga-testing-outer')).to.equal(true);

        expect(wrapper.children()).to.have.length(3);
        expect(wrapper.childAt(0).is('span.input-outer')).to.equal(true);
        expect(wrapper.childAt(1).is('button.saga-testing-submit-button')).to.equal(true);
        expect(wrapper.childAt(2).is('span.saga-testing-result')).to.equal(true);
    });

    describe('Postfix string input', () => {
        it('should be rendered', () => {
            const wrapper = shallow(<SagaTesting />, createMockStore({
                testString: '',
                result: null,
                error: false
            })).dive();

            expect(wrapper.childAt(0).children()).to.have.length(2);

            expect(wrapper.childAt(0).childAt(0).is('label')).to.equal(true);
            expect(wrapper.childAt(0).childAt(0).text()).to.equal('Input a postfix expression here:');

            expect(wrapper.childAt(0).childAt(1).is('input.saga-testing-input')).to.equal(true);
        });
        it('should render an error class', () => {
            const wrapper = shallow(<SagaTesting />, createMockStore({
                testString: '',
                result: null,
                error: true
            })).dive();

            expect(wrapper.childAt(0).childAt(1).hasClass('error')).to.equal(true);
        });
        it('should base its value off the store', () => {
            const wrapper = shallow(<SagaTesting />, createMockStore({
                testString: 'foo',
                result: null,
                error: true
            })).dive();

            expect(wrapper.childAt(0).childAt(1).props().value).to.equal('foo');
        });
        it('should dispatch the correct action on change', () => {
            const store = createMockStore({
                testString: '',
                result: null,
                error: false
            });

            const wrapper = shallow(<SagaTesting />, store).dive();

            expect(store.isActionDispatched({ type: 'INPUT_CHANGED', value: 'bar' })).to.equal(false);

            wrapper.childAt(0).childAt(1).simulate('change', { target: { value: 'bar' } });

            expect(store.isActionDispatched({ type: 'INPUT_CHANGED', value: 'bar' })).to.equal(true);
        });
    });

    describe('Load button', () => {
        it('should render its text', () => {
            const wrapper = shallow(<SagaTesting />, createMockStore({
                testString: '',
                result: null,
                error: false
            })).dive();

            expect(wrapper.childAt(1).text()).to.equal('Load');
        });
        it('should dispatch the correct action on click', () => {
            const store = createMockStore({
                testString: '',
                result: null,
                error: false
            });

            const wrapper = shallow(<SagaTesting />, store).dive();

            expect(store.isActionDispatched({ type: 'LOAD_INITIATED' })).to.equal(false);

            wrapper.childAt(1).simulate('click');

            expect(store.isActionDispatched({ type: 'LOAD_INITIATED' })).to.equal(true);
        });
    });

    describe('Result', () => {
        it('should be displayed', () => {
            const wrapper = shallow(<SagaTesting />, createMockStore({
                testString: 'foo',
                result: 18.39,
                error: false
            })).dive();

            expect(wrapper.childAt(2).text()).to.equal('Result: 18.39');
        });
        it('should display an error if one occurred', () => {
            const wrapper = shallow(<SagaTesting />, createMockStore({
                testString: 'foo',
                result: 18.39,
                error: true
            })).dive();

            expect(wrapper.childAt(2).text()).to.equal('Invalid postfix string!');
        });
    });
});

