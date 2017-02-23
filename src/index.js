import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import nattyFetch from 'natty-fetch';

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

// 全局 API 配置
nattyFetch.setGlobal({
  mock: true,
  withCredentials: false,
  mockUrlPrefix: '//ata/',
  fit: (res) => {
    return {
      success: !res.errors || res.errors.length === 0,
      content: res.content,
      error: res.errors && res.errors[0]
    }
  }
});

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={rootRoute}/>
  </Provider>,
  document.getElementById('root')
);
