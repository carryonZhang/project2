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
