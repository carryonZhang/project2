import nattyFetch from 'natty-fetch';

const apiContext = nattyFetch.context({
  urlPrefix: '/test/',
});

apiContext.create({
  'login': {
    url: 'login',
    mockUrl: '121/alwaysSuccess',
    method: 'post'
  }
});

export default apiContext.api;
