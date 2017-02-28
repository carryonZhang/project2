
import {LEGEND_CHANGE, GRID_INITIAL} from "../constants"

export const legendChange = (itemInfo) => ({
    type: LEGEND_CHANGE,
    itemInfo
});

export const gridInitial = (options) => ({
    type: GRID_INITIAL,
    options
});

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


