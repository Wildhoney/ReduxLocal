import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { local } from '../../src/redux-local';
import reducers from './reducers';
import Container from './container';

import '../sass/default.scss';

render((
    <Provider store={createStore(reducers)}>
        <Container />
    </Provider>
), document.querySelector('.app'));
