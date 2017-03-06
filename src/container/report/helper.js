import {LINE, BAR, PIE, RADAR} from "../../constants";
export function getLegend(labels) {
    let legendData = labels.split(";");
    let legendSelected = {};

    legendData.forEach((legendName, index) => {
        // 默认选中第一项
        legendSelected[legendName] = index === 0;
    });
    return {
        data: legendData,
        selected: legendSelected
    }
}

export function getSeries(types, legendData) {
    let chartType;

    if (types.indexOf(LINE)) {
        chartType = LINE
    } else if (types.indexOf(BAR)) {
        chartType = BAR;
    }
    else if (types.indexOf(PIE)) {
        chartType = PIE;
    } else if (types.indexOf(RADAR)) {
        chartType = RADAR
    }

    const series = [];
    legendData.forEach((legendName, index) => {
        let seriesItem = {};
        seriesItem.name = legendName;
        seriesItem.type = chartType;
        series.push(seriesItem);
    });
    return series;

}

export function getTable() {
    return undefined;
}


export function getDataOption(DATA) {
    console.log(DATA);

    // 此处假定xLabel是日期
    const xLabel = "日期";
    const legendData = DATA.columns.splice(DATA.columns.indexOf(xLabel), 1);

    const series = [];
    legendData.forEach((legendName, index) => {
        let seriesItem = {};

        seriesItem.data = DATA.rows.map((daily) => {
            return daily[legendName];
        });
        series.push(seriesItem);
    });

    //获取x轴标签间隔多少显示
    const xData = DATA.rows.map((daily) => {
        return daily[xLabel];
    });
    let interval = 0;
    if (xData.length > 15) {
        interval = xData.length / 12;
    } else {
        interval = -1;
    }
    interval = Math.round(interval);

    const dataOption =  {
        xAxis: {
            data: xData,
            axisLabel: {
                interval: interval,
                rotate: 45
            }
        },
        /* yAxis: {
         axisLabel: {
         formatter: function (value) {
         return value
         }
         }
         },*/
        series: series,
    };
}

