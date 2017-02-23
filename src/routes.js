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
    }
  ]
}
