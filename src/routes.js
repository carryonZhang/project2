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
    }
  ]
}
