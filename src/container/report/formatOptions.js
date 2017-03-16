const TABLE = "table";
const LINE = "line";
const BAR = "bar";
const PIE = "pie";
const RADAR = "radar";
const allCharts = [LINE, BAR, RADAR, PIE];

function formatOptions(details, data) {
    // 接口数据： xLabel, yLabels, types, rows, footRows, columns
    const DETAILS = details;
    const DATA = data;
    const xLabel = DETAILS.axisXLabel;
    const yLabels = DETAILS.axisYLabel.split(";").map(label => label.trim());
    const types = DETAILS.reportType.toLowerCase().split(",").map(type => type.trim());
    const rows = DATA.rows;
    const footRows = DATA.footRows[0];
    const columnsData = DATA.columns;
    debugger;
    // 标识变量
    // 没有响应
    let hasError = Object.keys(DATA).length < 1;
    // 响应但是无有效数据
    let hasNullData = rows.length < 1;
    // 是否有 chart:
    let hasChart = false;

    let tableData;
    let chartOption;
    // table
    if (types.includes(TABLE)) {
        tableData = getTableData(xLabel, rows, columnsData, footRows);
        types.splice(types.indexOf(TABLE), 1);
        console.log("types", types)
    }
    // chart
    if (allCharts.includes(types) && rows.length > 0) {
        hasChart = true;
        chartOption = getChartOption(xLabel, yLabels, types, rows, columnsData)
    }

    const result = Object.assign({}, chartOption,
        {
            // flag
            hasError,
            hasNullData,
            hasChart,
            tableData,
        });
    debugger;
    return result;
}


function getTableData(xLabel, rows, columnsData, footRows) {
    console.log(rows);
    const dataSource = rows.map((daily, index) => {
        // console.log(daily)
        daily.key = index;
        return daily;
    });

    if (footRows && Object.keys(footRows).length > 0) {
        footRows.key = dataSource.length;
        footRows.rowkey = "footRows";
        dataSource.unshift(footRows);
    }


    const columns = columnsData.map((ele, index) => {
        const col = {};
        col.title = ele;
        col.dataIndex = ele;
        col.key = ele;
        col.width = "150";
        if (ele === xLabel) {
            col.fixed = 'left';
        }
        return col;
    });
    /*    console.log(columns)
     console.log(dataSource);*/
    return {
        dataSource,
        columns,
    }
}
function getChartOption(xLabel, yLabels, type, rows, columnsData) {
    // option 字段
    const legendData = [];
    const legendSelected = {};
    const series = [];
    let seriesType = type[0];
    yLabels.forEach((label, index) => {
        legendData[index] = label;
        if (seriesType === LINE || seriesType === BAR) {
            // line bar 选中第一项
            legendSelected[label] = index === 0;
        } else {
            // pie, radar全部选中;
            legendSelected[label] = true;
        }

        // 未考虑 radar
        let seriesItem = {};
        if (seriesType === PIE) {
            seriesItem.type = seriesType;
            seriesItem.value = rows[0][label];
        } else {
            // line bar
            seriesItem.name = label;
            seriesItem.type = seriesType;
            seriesItem.data = rows.map(daily => daily[label]);
        }
        series.push(seriesItem);
    });

    let dynamicOption = {
        legend: {
            data: legendData,
            selected: legendSelected,
            show: false
        },
        series: series,
    };

    if (seriesType === LINE || seriesType === BAR) {
        //获取x轴标签间隔多少显示
        const xAxisData = rows.map(daily => daily[xLabel]);
        let interval = 0;
        if (xAxisData.length > 15) {
            interval = xAxisData.length / 12;
        } else {
            interval = -1;
        }
        interval = Math.round(interval);
        const tooltip = {
            trigger: 'axis'
        };
        const xAxis = {
            type: "category",
            data: xAxisData,
            axisLabel: {
                interval: interval,
                rotate: 45
            },
        };
        const yAxis = {
            type: "value"
        };
        Object.assign(dynamicOption, {tooltip, xAxis, yAxis});
    } else if(seriesType === PIE){
        const tooltip = {
            trigger: 'item'
        };
        Object.assign(dynamicOption, {tooltip});
    } else if (seriesType === RADAR) {
        alert("radar 还没做");
        // dynamicOption = getRadarOption(types, yLabels, rows);
    }

    const staticOption = {
        // option
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        grid: {
            top: "5%",
            height: "75%",
        },

        toolbox: {
            show: true
        },
        legend: {},
    };
    return Object.assign({}, staticOption, dynamicOption)
}

export default formatOptions;

