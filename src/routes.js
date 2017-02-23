import {injectAsyncReducer} from './utils/asyncInjector';

export default function createRoutes(store) {
  return [
    {
      path: '/',
      name: 'Reports',
      getComponent: (location, render) => {
        require.ensure([
          './container/Reports/reducers',
          './container/Reports'
        ], (require) => {
          const container = require('./container/Reports').default;
          const reducer = require('./container/Reports/reducers').default;

          injectAsyncReducer(store, 'Reports', reducer);
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
