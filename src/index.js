import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';

import configureStore from './store';
import createRoutes from './routes';

import App from './container/app';
import './global.css';

const initialState = {};
const store = configureStore(initialState);

const rootRoute = {
    component: App,
    childRoutes: createRoutes(store)
};

// function handleGlobalMessage() {
//     const {global} = store.getState();
//
//     debugger
// }
//
// store.subscribe(handleGlobalMessage);

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={rootRoute}/>
    </Provider>,
    document.getElementById('root')
);
