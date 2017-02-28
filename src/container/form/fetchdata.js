/**
 * Created by long-mac on 2017/2/27.
 */
import nattyFetch from 'natty-fetch';

const fetchdata = nattyFetch.context({
  urlPrefix: ''
});

fetchdata.create({
  'getQueryArgs': {
    mock: true,
    mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/127/report/queryArgs.json',
    data: {
      reportId: ''
    },
    method: 'post'
  }
});

export default fetchdata.api;