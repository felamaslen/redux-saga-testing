import { expect } from 'chai';
import '../../browser';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../../../src/components/app';
import Calculator from '../../../src/containers/calculator';

describe('<App />', () => {
    it('should render the app root', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.is('div.app-root')).to.equal(true);
    });
    it('should render <Calculator />', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.children()).to.have.length(1);
        expect(wrapper.childAt(0).is(Calculator)).to.equal(true);
    });
});

