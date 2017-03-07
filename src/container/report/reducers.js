import {combineReducers} from "redux";
import {
    RECEIVE_LEGEND_CHANGE,
    TABLE,
    LINE,
    BAR,
    PIE,
    RADAR
} from "../../constants";

import {
    RECEIVE_CHARTS_OPTIONS,
    RECEIVE_CHARTS_LEGEND,
    RECEIVE_SEARCH_ARGS
} from '../../constants'

/*const initialOption = {
    color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    grid: {
        // show: false,
        // left: '1%',
        // right: "5%",
        // top: '2%',
        // bottom: "20%",
        // height: "80%",
    },
    tooltip: {
        show: false,
        trigger: 'axis'
    },
    toolbox: {
        show: false
    },
};*/

const optionsReducer = (state = {}, action) => {
    switch (action.type) {

        case RECEIVE_CHARTS_OPTIONS:
            return action.option;

        default:
            return state;
    }
};

const legendReducer = (state = {}, action) => {

    switch (action.type) {

        case RECEIVE_CHARTS_LEGEND:
            return action.legend;

        case RECEIVE_LEGEND_CHANGE:
            const newLegendSelected = action.newLegendSelected;
            return Object.assign({}, state, {newLegendSelected});

        default:
            return state;
    }
};

// 根据传回的表单查询列表排序后返回给container
// 根据生成的控件的数量决定有几行,每行放3个控件, 3个Col
const queryHandle = (querys) => {
    querys.sort(function (a, b) {
        return a.fieldPos - b.fieldPos;
    });
    return querys;
};

const searchFormReducer = (state = [], action) => {

    switch (action.type) {

        case RECEIVE_SEARCH_ARGS:
            return queryHandle(action.args);

        default:
            return state;
    }
};

export default combineReducers({
    option: optionsReducer,
    legend: legendReducer,
    searchArgs: searchFormReducer
});
