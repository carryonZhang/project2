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
    'getSearchFormArgs': {
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
    },
    'getChartData': {
        mock: true,
        url: 'chartdata',
        mockUrl: '127/report/data.json',
        method: "post"
    },
    'getExcel': {
        mock: true,
        url: 'data.json',
        mockUrl: '127/report/exportXls.do',
        method: 'post'
    }
});


export default apiContext.api;
