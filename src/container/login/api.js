import nattyFetch from 'natty-fetch';

const apiContext = nattyFetch.context({
  urlPrefix: '/test/',
  mock: true,
  withCredentials: false,
  mockUrlPrefix: '//mock.2dfire-daily.com/mock-serverapi/mockjsdata/',
  fit: (res) => {
    return {
      success: !res.errors || res.errors.length === 0,
      content: res.content,
      error: res.errors && res.errors[0]
    }
  }
});

apiContext.create({
  'login': {
    url: 'login',
    mockUrl: '121/alwaysSuccess',
    method: 'post'
  }
});

export default apiContext.api;
