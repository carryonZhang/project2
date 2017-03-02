/* eslint-disable */
__webpack_public_path__ = __CDN_JS__;

import {injectAsyncReducer} from './utils/asyncInjector';

export default function createRoutes(store) {
  return [
    {
      path: '/reports',
      name: 'reports',
      getComponent: (location, render) => {
        require.ensure([
          './container/reports/reducers',
          './container/reports'
        ], (require) => {
          const container = require('./container/reports').default;
          const reducer = require('./container/reports/reducers').default;

          injectAsyncReducer(store, 'reports', reducer);
          render(null, container);
        });
      }
    }
  ]
}
