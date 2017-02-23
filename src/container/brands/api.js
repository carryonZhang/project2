/**
 * 店铺选择页面 API 中心
 */

import nattyFetch from 'natty-fetch';

const apiContext = nattyFetch.context({
  urlPrefix: '/test/'
});

apiContext.create({
  'login': {
    url: 'login',
    mockUrl: '121/alwaysSuccess',
    method: 'post'
  }
});

export default apiContext.api;
