/**
 * App Actions
 *
 * 位于 `/src/container/App` 下的 action 是相对于全局使用，集成错误提示、弹窗等。
 */
import api from '../api';

/******************************************************
 * 全局
 */

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


/******************************************************
 * 报表
 */

import {
    RECEIVE_CHARTS_LEGEND,
    RECEIVE_CHARTS_CONSTRUCT,
    RECEIVE_CHARTS_DATA,
    SET_LEGEND_CHANGE,
    SET_CHARTS_LEGEND
} from '../constants';

import formatOptions from '../container/report/formatOptions';

export const setChartLegend = (legend) => ({
    type: SET_CHARTS_LEGEND,
    legend
});

export const setLegendChange = (legendSelected) => ({
    type: SET_LEGEND_CHANGE,
    legendSelected
});

//  return whole legend to reducer
const receiveChartsLegend = legend => ({
    type: RECEIVE_CHARTS_LEGEND,
    legend
});

/**
 * 1.进入页面直接拉取原始结构，并存储到 reducer
 * 2.当报表数据拉取时，从 reducer 读取原始结构，并渲染
 */

// 1.获取报表初始化结构
export const fetchChartConstruct = ({reportId}) => (dispatch) => {
    api.getChartDetails({reportId}).then(
        e => dispatch(receiveChartConstruct(e)),
        err => dispatch(globalMessageError('图表初始化失败，请刷新重试'))
    )
};

export const receiveChartConstruct = construct => ({
    type: RECEIVE_CHARTS_CONSTRUCT,
    construct
});

// 2.获取报表详细数据
export const fetchChartData = ({reportId, params}) => (dispatch, getState) => {

    const {reports} = getState(); // 从之前初始化保存的 state 中取出结构数据

    api.getChartData({reportId, ...params}).then(
        e => {
            const chartsConfig = formatOptions(reports.construct, e); // formatOptions(结构, 数据) 返回完整报表

            dispatch(receiveChartData(chartsConfig));
            dispatch(setChartLegend(chartsConfig.legend));
        },
        err => dispatch(globalMessageError('图表数据获取失败，请刷新重试'))
    )
};

export const receiveChartData = data => ({
    type: RECEIVE_CHARTS_DATA,
    data
});


/******************************************************
 * 报表搜索框
 */

import {
    FORM_INIT,
    GET_REPORT,
    RECEIVE_SEARCH_ARGS
} from '../constants';

export const fetchSearchArgs = ({reportId}) => {
    return (dispatch) => {
        api.getSearchFormArgs({reportId}).then(
            e => dispatch(receiveSearchArgs(e)),
            err => dispatch(globalMessageError('搜索框条件拉取失败'))
        );
    }
};

export const receiveSearchArgs = args => ({
    type: RECEIVE_SEARCH_ARGS,
    args
});


export const getReport = ({reportId, mapData}) => {
    return (dispatch) => {
        api.getReport({reportId, Map: mapData}).then((res) => {
            dispatch({
                type: GET_REPORT,
                report: res
            })
        }, (err) => {
            console.log(err);
        });
    }
};

