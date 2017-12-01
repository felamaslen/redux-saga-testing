/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import '../../browser';
import React from 'react';
import shallow from '../../shallow-with-store';
import { createMockStore } from 'redux-test-utils';
import SagaTesting from '../../../src/containers/saga-testing';
import InputGroup from '../../../src/components/input-group';

describe('<SagaTesting />', () => {
    it('should render its basic structure', () => {
        const wrapper = shallow(<SagaTesting />, createMockStore({
            testString: {
                postfix: ''
            },
            result: {
                postfix: null
            },
            error: false
        })).dive();

        expect(wrapper.is('div.saga-testing-outer')).to.equal(true);

        expect(wrapper.children()).to.have.length(2);
    });

    it('should render a postfix input group', () => {
        const store = createMockStore({
            testString: {
                postfix: ''
            },
            result: {
                postfix: null
            },
            error: false
        });

        const wrapper = shallow(<SagaTesting />, store).dive();

        expect(wrapper.childAt(0).is(InputGroup)).to.equal(true);
        expect(wrapper.childAt(0).props()).to.deep.include({
            category: 'postfix',
            errorValue: false,
            value: { postfix: '' },
            result: { postfix: null }
        });

        expect(store.isActionDispatched({ type: 'INPUT_CHANGED', category: 'postfix', value: 'foo' })).to.equal(false);

        wrapper.childAt(0).props().onChange('postfix')({ target: { value: 'foo' } });

        expect(store.isActionDispatched({ type: 'INPUT_CHANGED', category: 'postfix', value: 'foo' })).to.equal(true);
    });

    it('should render an infix input group', () => {
        const store = createMockStore({
            testString: {
                infix: ''
            },
            result: {
                infix: null
            },
            error: false
        });

        const wrapper = shallow(<SagaTesting />, store).dive();

        expect(wrapper.childAt(1).is(InputGroup)).to.equal(true);
        expect(wrapper.childAt(1).props()).to.deep.include({
            category: 'infix',
            errorValue: false,
            value: { infix: '' },
            result: { infix: null }
        });

        expect(store.isActionDispatched({ type: 'INPUT_CHANGED', category: 'infix', value: 'foo' })).to.equal(false);

        wrapper.childAt(1).props().onChange('infix')({ target: { value: 'foo' } });

        expect(store.isActionDispatched({ type: 'INPUT_CHANGED', category: 'infix', value: 'foo' })).to.equal(true);
    });

});

