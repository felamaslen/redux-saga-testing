/* eslint-disable global-require */
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';

import 'babel-polyfill';

import store from './store';
import Root from './containers/root';

function renderApp(RootComponent = Root) {
    render(
        <AppContainer>
            <RootComponent store={store} />
        </AppContainer>,
        document.getElementById('root')
    );
}

renderApp();

if (module.hot) {
    module.hot.accept(
        './containers/root',
        () => renderApp(require('./containers/root').default)
    );
}

