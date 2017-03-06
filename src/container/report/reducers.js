import {combineReducers} from "redux";
import {CHART_INIT, CHART_LOAD, RECEIVE_LEGEND_CHANGE,  TABLE, LINE, BAR, PIE, RADAR} from "../../constants";
// import {getLegend, getSeries, getTable, getDataOption} from "./helper";

import {
    RECEIVE_CHARTS_OPTIONS,
    RECEIVE_CHARTS_LEGEND
} from '../../constants'

const initialOption = {
    color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    grid: {
        show: false,
        left: '1%',
        right: "5%",
        top: '2%',
        bottom: "2%",
        // width: "80%",
        height: "80%",
        containLabel: true
    },
    tooltip: {
        show: false,
        trigger: 'axis'
    },
    toolbox: {
        show: false
    },
};

const optionsReducer = (state = initialOption, action) => {
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
            // debugger
            return action.legend;
        case RECEIVE_LEGEND_CHANGE:
            const newLegendSelected = action.newLegendSelected;
            console.log("legend change")
            return Object.assign({}, state, {newLegendSelected});
        default:
            return state;
    }
};

export default combineReducers({
    option: optionsReducer,
    legend: legendReducer
})

//
// //
// const defaultStore = {
//     xLabel: "",
//     yLabels: [],
//     chartType: "",
//     tableType: "",
//     rows: [],
//     selected: {}
// };
//
//
//
// const chartRender = ( staticOption = {}, action) => {
//     switch (action.type) {
//         case CHART_LOAD:
//
//
//             const tableType = types.indexOf(TABLE) ? TABLE : "";
//

//
//
//
//             return Object.assign({}, staticOption, {xLabel, yLabels, chartType, tableType, rows, selected});
//
//         default:
//             return staticOption;
//     }
// };
//
// /*const chartLoad = (dataOption = staticOpt, action) => {
//     switch(action.type) {
//         case CHART_LOAD:
//             const DATAOption = getDataOption(action.payload);
//             return DATAOption;
//             break;
//
//         default:
//             return dataOption;
//     }
// };*/
//
// const legendChange = (state = defaultStore, action) => {
//     switch (action.type) {
//         case LEGEND_CHANGE:
//             const newOption = Object.assign({}, state);
//             Object.assign(newOption.legend.selected, action.itemInfo);
//             return newOption;
//         default:
//             return state
//     }
// };
// const reportApp = combineReducers({
//     chartRender,
//     // chartLoad,
//     legendChange,
// });
// export default reportApp;
//
//
//
//
//
//
//
