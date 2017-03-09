import {combineReducers} from "redux";

import {
    RECEIVE_CHARTS_LEGEND,
    RECEIVE_SEARCH_ARGS,

    RECEIVE_CHARTS_CONSTRUCT,
    RECEIVE_CHARTS_DATA,
    SET_LEGEND_CHANGE,
    SET_CHARTS_LEGEND,
    RECEIVE_UNION_SELECT,
    SET_SEARCH_BUTTON_STATE
} from '../../constants'

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
const queryHandle = (querys) => {
    querys.sort(function (a, b) {
        return a.fieldPos - b.fieldPos;
    });
    return querys;
};

// 搜索条件
const searchFormReducer = (state = [], action) => {

    switch (action.type) {

        case RECEIVE_SEARCH_ARGS:
            return queryHandle(action.args);

        case RECEIVE_UNION_SELECT:
            return state.map(e => {

                //  ...接口定义 @yama
                if (e.lovEntity && (e.lovEntity.lovQueryId == action.child.lovQueryId)) {
                    return Object.assign({}, e, {lovEntity: action.child})
                } else {
                    return e;
                }

            });

        default:
            return state;
    }
};

const buttonState = (state = {submit: false, export: false}, action) => {
    switch (action.type) {
        case SET_SEARCH_BUTTON_STATE:
            return Object.assign({}, state, action.status);

        default:
            return state;
    }
};

export default combineReducers({
    legend: chartLegend,
    construct: chartConstruct,
    data: chartData,
    searchArgs: searchFormReducer,
    buttonState: buttonState
});
