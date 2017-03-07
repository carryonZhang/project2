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
        url: 'http://10.1.6.42:8080/athena-api/report/queryArgs.json?reportId=9fbc53fe14df458aa3a756c05dd4c816',
        mockUrl: '127/report/queryArgs.json',
        method: 'POST'
    },
    'getChartDetails': {
        mock: true,
        url: 'details',
        mockUrl: '127/report/details.json',
        method: 'POST'
    },
    'getChartData': {
        mock: true,
        url: 'chartdata',
        mockUrl: '127/report/data.json',
        method: "POST"
    },
    'getExcel': {
        mock: true,
        url: 'data.json',
        mockUrl: '127/report/exportXls.do',
        method: 'POST'
    },
    'getUnionSelect': {
        mock: true,
        url: 'http://10.1.135.242:8080/',
        mockUrl: '127/report/lovValues.json',
        method: 'POST'
    }
});


export default apiContext.api;
