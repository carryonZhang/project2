import nattyFetch from 'natty-fetch';

const apiContext = nattyFetch.context({
    mock: false,
    urlPrefix: 'http://10.1.7.61:8080/athena-api/',
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

    // 搜索条件
    'getSearchFormArgs': {
        url: 'report/queryArgs.json',
        mockUrl: '127/report/queryArgs.json',
        method: 'POST'
    },

    // 报表 chart 结构
    'getChartDetails': {
        url: 'report/details.json',
        mockUrl: '127/report/details.json',
        method: 'POST'
    },

    // 报表 chart 数据
    'getChartData': {
        url: 'report/data.json',
        mockUrl: '127/report/data.json',
        method: 'POST'
    },

    // "导出 Excel "
    'getExcel': {
        url: 'report/exportXls.do',
        mockUrl: '127/report/exportXls.do',
        method: 'POST'
    },

    // 联动下拉框时，异步取数据
    'getUnionSelect': {
        url: 'report/lovValues.json',
        mockUrl: '127/report/lovValues.json',
        method: 'POST'
    }
});


export default apiContext.api;
