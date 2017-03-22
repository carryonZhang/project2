import nattyFetch from 'natty-fetch';
import * as bridge from '../utils/bridge';
import {callParent} from '../utils/bridge';
import {currentAPIUrlPrefix} from '../utils/env';

const apiContext = nattyFetch.context({
    mock: false,
    urlPrefix: currentAPIUrlPrefix, // eslint-disable-line
    mockUrlPrefix: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/',
    withCredentials: false,
    postDataFormat: 'JSON',
    willFetch: (vars, config) => {
        if (!config.mock) {
            const {token} = bridge.getParamsObject();
            config.header['X-Token'] = token || ''
        }
    },
    fit: (res) => {

        if (res.code === 0 && res.errorCode === '401') {
            callParent('logout');
            return;
        }

        return {
            success: res.code && res.code === 1,
            content: res.data,
            error: {message: res.message, errorCode: res.errorCode}
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
