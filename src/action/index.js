import {
    LEGEND_CHANGE,
    GRID_INITIAL,
    FORM_INIT,
    GET_REPORT
} from '../constants';

import reportsApi from '../api';


export const legendChange = (itemInfo) => ({
    type: LEGEND_CHANGE,
    itemInfo
});

export const gridInitial = (options) => ({
    type: GRID_INITIAL,
    options
});

export const formInit = (reportId) => {
    return (dispatch) => {
        reportsApi.getQueryArgs({reportId: 1}).then((res) => {
            // console.log(res);
            dispatch({
                type: FORM_INIT,
                payload: res
            })
        }, (err) => {
            console.log(err);
        });
    }
};

export const getReport = (id, data) => {
    return (dispatch) => {
        reportsApi.getReport({reportId: id, Map: data}).then((res)=> {
            console.log('报表查询请求返回的数据', res);
            dispatch({
                type: GET_REPORT,
                report: res
            })
        }, (err) => {
           console.log(err); 
        });
    }
}
