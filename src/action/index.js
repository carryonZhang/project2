/**
 * App Actions
 *
 * 位于 `/src/container/App` 下的 action 是相对于全局使用，集成错误提示、弹窗等。
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


import {
    RECEIVE_CHARTS_OPTIONS,
    RECEIVE_CHARTS_LEGEND,
    RECEIVE_LEGEND_CHANGE

} from '../constants';

import api from '../api';
import formatOptions from '../container/report/formatOptions';

// fetch charts details and data
export const fetchChartsConfig = ({reportId}) => async(dispatch) => {
    try {
        let details = await api.getChartDetails({reportId});
        let data = await api.getChartData({reportId});
        let chartsConfig = formatOptions(details, data);
        console.log(chartsConfig);
        await dispatch(receiveChartsOptions(chartsConfig));
        await dispatch(receiveChartsLegend(chartsConfig.legend));
    } catch (error) {
        dispatch(globalMessageError('图表数据拉取失败 '));
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



// export const fetchChartsInitial = (reportId) => {
//     return (dispatch) => {

// TODO async queue
// fetch details


//
//
//         try {
//             const details = yield reportsApi.getChartDetails({});
//             const data = yield reportsApi.getChartData({reportId: 1});
//         } catch (e) {
//
//         }
//
//
//         reportsApi.getChartDetails({reportId: 1}).then(
//             (details) => {
//
//                 // fetch datt
//                 reportsApi.getChartData({reportId: 1}).then(
//                     (data) => {
//
//
//
//                         dispatch({
//                             type: CHART_LOAD,
//                             details,
//                             data
//                         });
//                     },
//                     (err) => {
//                         debugger;
//                     }
//                 );
// /*
//                 dispatch({
//                     type: CHART_INIT,
//                     details
//                 })*/
//             },
//             (err) => {
//                 debugger;
//             }
//         );
//     }
// };

/*export const fetchData = (reportId) => {
 return (dispatch) => {
 reportsApi.getChartData({reportId: 1}).then(
 (res) => {
 dispatch({
 type: CHART_LOAD,
 payload: res
 });
 },
 (err) => {
 debugger;
 }
 );
 }
 };*/
//

