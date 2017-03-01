
import {LEGEND_CHANGE, GRID_INITIAL} from "../constants"

import reportsApi from "../api"


export const legendChange = (itemInfo) => ({
    type: LEGEND_CHANGE,
    itemInfo
});

export const gridInitial = (options) => ({
    type: GRID_INITIAL,
    options
});

export const formInit = (querys) => {
    return (dispatch) => {
        reportsApi.getQueryArgs({}).then((res) => {
            console.log(res);
            dispatch({
              type: FORM_QUERY_ARGS,
              payload: res
            })
        }, (err) => {
            console.log(err);
        });
    }
};
/*export const login = (formData) => {
    return (dispatch) => {
        const {username, passward, remember} = formData;

        api.login({
            username: username,
            passward,
            remember
        }).then(res => {
        //    resolve
        }, err => {
        //    reject
        })
    }
}*/


