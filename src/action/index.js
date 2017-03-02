import {
    LEGEND_CHANGE,
    GRID_INITIAL,
    FORM_INIT
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

            debugger
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
