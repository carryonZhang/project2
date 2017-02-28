
import {CHART_INIT} from "../constants"

export const chartInit = (details) => ({
    type: CHART_INIT,
    details
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


