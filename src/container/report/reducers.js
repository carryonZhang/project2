import {combineReducers} from "redux";

import {
    RECEIVE_CHARTS_LEGEND,
    RECEIVE_SEARCH_ARGS,

    RECEIVE_CHARTS_CONSTRUCT,
    RECEIVE_CHARTS_DATA,
    SET_LEGEND_CHANGE,
    SET_CHARTS_LEGEND
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

const chartLegend = (state = {}, action) => {

    switch (action.type) {

        case SET_CHARTS_LEGEND:
            return action.legend;

        case SET_LEGEND_CHANGE:
            const {legendSelected} = action;
            return Object.assign({}, state, {legendSelected});

        default:
            return state;
    }
};

// 报表结构
const chartConstruct = (state = {}, action) => {
    switch (action.type) {

        case RECEIVE_CHARTS_CONSTRUCT:
            return action.construct;

        default:
            return state;
    }
};

// 报表数据
const chartData = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CHARTS_DATA:
            return action.data;

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
    legend: chartLegend,
    construct: chartConstruct,
    data: chartData,
    searchArgs: searchFormReducer
});
