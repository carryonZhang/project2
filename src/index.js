import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import nattyFetch from 'natty-fetch';

import configureStore from './store';
import createRoutes from './routes';

import App from './container/app';

import { formInit } from './action';

import './global.css';

const initialState = {};
const store = configureStore(initialState);

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store)
};

// 全局 API 配置
nattyFetch.setGlobal({
  withCredentials: true,
  fit: (res) => {
    debugger
    return {
      success: res.code && res.code == 1,
      content: res.data,
      error: {message: res.message}
    }
  }
});

store.dispatch(formInit())

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={rootRoute}/>
  </Provider>,
  document.getElementById('root')
);
