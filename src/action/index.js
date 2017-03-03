import {
    LEGEND_CHANGE,
    CHART_INIT,
    FORM_INIT
} from '../constants';

import reportsApi from '../api';


export const legendChange = (itemInfo) => ({
    type: LEGEND_CHANGE,
    itemInfo
});


export const formInit = (reportId) => {
    return (dispatch) => {
        reportsApi.getQueryArgs({reportId: 1}).then((res) => {

            console.log(res);
            dispatch({
                type: FORM_INIT,
                payload: res
            })
        }, (err) => {
            console.log(err);
            debugger
        });
    }
};

export const fetchChartDetails = (reportId) => {
    return (dispatch) => {
        reportsApi.getChartDetails({reportId: 1}).then(
            (res) => {
                // console.log(res);
                dispatch({
                    type: CHART_INIT,
                    payload: res
                })
            },
            (err) => {
                // console.log(err);
                debugger;
            }
        );
    }
};


