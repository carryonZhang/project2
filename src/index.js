import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import nattyFetch from 'natty-fetch';

import configureStore from './store';
import createRoutes from './routes';
import App from './container/App';

import './global.css';

const initialState = {};
const store = configureStore(initialState);

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store)
};

nattyFetch.setGlobal({});

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={rootRoute}/>
  </Provider>,
  document.getElementById('root')
);
