import {injectAsyncReducer} from './utils/asyncInjector';

export default function createRoutes(store) {
  return [
    {
      path: '/login',
      name: 'login',
      getComponent: (location, render) => {
        require.ensure([
          './container/login/reducers',
          './container/login'
        ], (require) => {
          const container = require('./container/login').default;
          const reducer = require('./container/login/reducers').default;

          injectAsyncReducer(store, 'login', reducer);
          render(null, container);
        });
      }
    },
    {
      path: '/brands',
      name: 'brands',
      getComponent: (location, render) => {
        require.ensure([
          './container/brands/reducers',
          './container/brands'
        ], (require) => {
          const container = require('./container/brands').default;
          const reducer = require('./container/brands/reducers').default;

          injectAsyncReducer(store, 'brands', reducer);
          render(null, container);
        });
      }
    },
  ]
}

// 1. Reducers 别名何处定义
// 4. 何处注册进 createStore


// 2. 何处 import 的reducer
// 3. 何处render component
