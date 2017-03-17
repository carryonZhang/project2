/**
 * App Actions
 *
 * 位于 `/src/container/App` 下的 action 是相对于全局使用，集成错误提示、弹窗等。
 */
import api from '../api';
import * as bridge from '../utils/bridge';
import {message as MessageComponent} from 'antd';

/******************************************************
 * 全局
 */

import {
    GLOBAL_MESSAGE_ERROR,
    GLOBAL_MESSAGE_SUCCESS,
    GLOBAL_LOADING,
    GLOBAL_LOADING_HIDE
} from '../constants';

export const globalMessageError = (message) => dispatch => {
    MessageComponent.error(message);
};

export const globalMessageSuccess = (message) => dispatch => {
    MessageComponent.success(message);
};

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
    RECEIVE_CHARTS_CONSTRUCT,
    RECEIVE_CHARTS_DATA,
    SET_LEGEND_CHANGE,
    SET_CHARTS_LEGEND,
    SET_SEARCH_BUTTON_STATE
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
/*
 const receiveChartsLegend = legend => ({
 type: RECEIVE_CHARTS_LEGEND,
 legend
 });
 */

/**
 * 1.进入页面直接拉取原始结构，并存储到 reducer
 * 2.当报表数据拉取时，从 reducer 读取原始结构，并渲染
 */

// 1.获取报表初始化结构
export const receiveChartConstruct = construct => ({
    type: RECEIVE_CHARTS_CONSTRUCT,
    construct
});

export const fetchChartConstruct = ({reportId}) => (dispatch) => {
    dispatch(globalLoading());

    const {entityId, entityCode, userId} = bridge.getParamsObject();

    api.getChartDetails({
        entityId,
        entityCode,
        userId,
        reportId
    }).then(
        res => dispatch(receiveChartConstruct(res)),
        err => dispatch(globalMessageError('图表初始化失败，请刷新重试'))
    ).then(e => dispatch(globalLoadingHide()));
};


// 2.获取报表详细数据
export const setChartButtonState = status => ({
    type: SET_SEARCH_BUTTON_STATE,
    status
});
export const receiveChartData = data => ({
    type: RECEIVE_CHARTS_DATA,
    data
});

export const fetchChartData = ({reportId, args}) => (dispatch, getState) => {
    const {reports} = getState(); // 从之前初始化保存的 state 中取出结构数据

    const {entityId, entityCode, userId} = bridge.getParamsObject();
    dispatch(setChartButtonState({submit: true}));

    api.getChartData({
        entityId,
        entityCode,
        userId,
        reportId,
        params: args
    }).then(
        res => {
            const chartsConfig = formatOptions(reports.construct, res); // formatOptions(结构, 数据) 返回完整报表
            // debugger
            dispatch(receiveChartData(chartsConfig));
            chartsConfig.legend && dispatch(setChartLegend(chartsConfig.legend));
        },
        err => dispatch(globalMessageError(err.message))
    ).then(e => dispatch(setChartButtonState({submit: false})));
};


/******************************************************
 * 报表搜索框
 */

import {
    RECEIVE_SEARCH_ARGS,
    RECEIVE_UNION_SELECT
} from '../constants';

// 获取初始化参数
export const receiveSearchArgs = args => ({
    type: RECEIVE_SEARCH_ARGS,
    args
});

export const fetchSearchArgs = ({reportId}) => {
    return (dispatch) => {
        dispatch(globalLoading());
        const {entityId, entityCode, userId} = bridge.getParamsObject();

        api.getSearchFormArgs({reportId, entityId, entityCode, userId}).then(
            res => dispatch(receiveSearchArgs(res)),
            err => dispatch(globalMessageError('搜索框条件拉取失败'))
        ).then(e => dispatch(globalLoadingHide()));
    }
};

// 导出excel
export const getExcel = (id, data) => {
    api.getExcel({reportId: id, Map: data}).then((res) => {
        // debugger;
        console.log(res);
    }, (err) => {
        console.log(err);
    });
};

// 下拉框联动请求
export const receiveUnionSelect = child => ({
    type: RECEIVE_UNION_SELECT,
    child
});

export const fetchUnionSelect = ({parentValue, parentId, reportId}) => dispatch => {
    dispatch(globalLoading());


    const {entityId, entityCode, userId} = bridge.getParamsObject();

    api.getUnionSelect({
        chainedParamValue: parentValue,
        lovQueryId: parentId,
        reportId: reportId,
        entityId,
        entityCode,
        userId
    }).then(
        res => dispatch(receiveUnionSelect(res)),
        err => dispatch(globalMessageError(err.message))
    ).then(e => dispatch(globalLoadingHide()));
};


/**
 * ****************************************************
 * 导入导出模块
 */

import {INPUT_TEXT, INIT_DATA, IMPORT_INFO} from '../constants';
export const setInputText = (txt) => ({
    type: INPUT_TEXT,
    txt
});

export const initData = (data) => ({
    type: INIT_DATA,
    data
});




