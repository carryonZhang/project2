import nattyFetch from "natty-fetch";

const apiContext = nattyFetch.context({
    urlPrefix: '',
    mockUrlPrefix: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/',
    withCredentials: false,
    postDataFormat: 'JSON',
    fit: (res) => {
        return {
            success: res.code && res.code === 1,
            content: res.data,
            error: {message: res.message}
        }
    }
});

apiContext.create({
    'getQueryArgs': {
        mock: true,
        url: 'queryArgs.json',
        mockUrl: '127/report/queryArgs.json',
        method: 'post'
    },
    'getChartDetails': {
        mock: true,
        url: 'details',
        mockUrl: '127/report/details.json',
        method: 'post'
    }
});


export default apiContext.api;
