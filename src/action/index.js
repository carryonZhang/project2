/**
 * App Actions
 *
 * 位于 `/src/container/App` 下的 action 是相对于全局使用，集成错误提示、弹窗等。
 */
import api from '../api';

import {
    GLOBAL_MESSAGE_ERROR,
    GLOBAL_MESSAGE_SUCCESS,
    GLOBAL_LOADING,
    GLOBAL_LOADING_HIDE
} from '../constants';

export const globalMessageError = (message) => ({
    type: GLOBAL_MESSAGE_ERROR,
    message
});

export const globalMessageSuccess = (message) => ({
    type: GLOBAL_MESSAGE_SUCCESS,
    message: message
});

export const globalLoading = () => ({
    type: GLOBAL_LOADING
});

export const globalLoadingHide = () => ({
    type: GLOBAL_LOADING_HIDE
});


import {
    RECEIVE_CHARTS_OPTIONS,
    RECEIVE_CHARTS_LEGEND,
    RECEIVE_LEGEND_CHANGE
} from '../constants';

import formatOptions from '../container/report/formatOptions';

// fetch charts details and data
export const fetchChartsConfig = ({reportId}) => async(dispatch) => {
    try {
        let details = await api.getChartDetails({reportId});
        let data = await api.getChartData({reportId});

        console.log(details, data);

        let chartsConfig = formatOptions(details, data);
        console.log(chartsConfig)
        await dispatch(receiveChartsOptions(chartsConfig));
        await dispatch(receiveChartsLegend(chartsConfig.legend));
    } catch (error) {
        dispatch(globalMessageError('图表数据拉取失败'));
    }
};

//  return formatted options to reducer
const receiveChartsOptions = option => ({
    type: RECEIVE_CHARTS_OPTIONS,
    option
});

//  return whole legend to reducer
const receiveChartsLegend = legend => ({
    type: RECEIVE_CHARTS_LEGEND,
    legend
});

export const receiveLegendChange = (newLegendSelected) => ({
    type: RECEIVE_LEGEND_CHANGE,
    newLegendSelected
});

/******************************************************
 * 报表搜索框
 */

import {
    FORM_INIT,
    GET_REPORT,
    RECEIVE_SEARCH_FORM_CONFIG
} from '../constants';

export const fetchFormInitialConfig = ({reportId}) => {
    return (dispatch) => {
        api.getSearchFormArgs({reportId}).then(
            e => dispatch(receiveSearchFormConfig(e)),
            err => dispatch(globalMessageError('搜索框条件拉取失败'))
        );
    }
};

export const receiveSearchFormConfig = config => ({
    type: RECEIVE_SEARCH_FORM_CONFIG,
    config
});


export const getReport = (id, data) => {
    return (dispatch) => {
        api.getReport({reportId: id, Map: data}).then((res) => {
            console.log('报表查询请求返回的数据', res);
            dispatch({
                type: GET_REPORT,
                report: res
            })
        }, (err) => {
            console.log(err);
        });
    }
};
