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
          './container/report/reducers',
          './container/report'
        ], (require) => {
          const container = require('./container/report').default;
          const reducer = require('./container/report/reducers').default;

          injectAsyncReducer(store, 'reports', reducer);
          render(null, container);
        });
      }
    },
    {
      path: '/updown',
      name: 'updown',
      getComponent: (location, render) => {
        require.ensure([
          './container/updown/reducers',
          './container/updown'
        ], (require) => {
          const container = require('./container/updown').default;
          const reducer = require('./container/updown/reducers').default;

          injectAsyncReducer(store, 'updown', reducer);
          render(null, container);
        });
      }
    }
  ]
}
