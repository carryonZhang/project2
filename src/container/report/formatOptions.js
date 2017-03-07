import {LINE, BAR, PIE, RADAR, TABLE} from "../../constants/index"

function formatOptions(details, data) {

    const DETAILS = details;
    const DATA = data;

    console.log(details, data)

    const xLabel = DETAILS.axisXLabel;
    const yLabels = DETAILS.axisYLabel.split(";").map(label => label.trim());
    const types = DETAILS.reportType.toLowerCase().split(",").map(type => type.trim());
    const rows = DATA.rows;
    const columnsData = DATA.columns;

    // debugger;

    let hasChart = false;
    let hasTable = false;


    // table start
    let tableData = null;
    if (types.includes(TABLE)) {
        hasTable = true;
        tableData = getTableData(xLabel, rows, columnsData)
        types.splice(types.indexOf(TABLE), 1);
    }
    // table end


    if (types.includes(LINE) ||
        types.includes(BAR) ||
        types.includes(PIE) ||
        types.includes(RADAR)) {
        hasChart = true;
    }

    let dynamicOption;
    if (types.includes(LINE) || types.includes(BAR)) {
        // seriesItemType = LINE;
        dynamicOption = getLineOrBarOption(types, yLabels, rows)
    } else if (types.includes(PIE)) {
        // seriesItemType = PIE;
        dynamicOption = getPieOption(types, yLabels, rows);
    } else if (types.includes(RADAR)) {
        dynamicOption = getRadarOption(types, yLabels, rows);
    }

    function getLineOrBarOption(types, yLabels, rows) {
        // legend and series
        const legendData = [];
        let legendSelected = {};
        const series = [];
        let seriesItemType = types[0];

        yLabels.forEach((label, index) => {
            legendData[index] = label;
            // 默认选中第一项
            legendSelected[label] = index === 0;

            let seriesItem = {};
            seriesItem.name = label;
            seriesItem.type = seriesItemType;
            seriesItem.data = rows.map(daily => daily[label]);
            series.push(seriesItem);
        });

        //获取x轴标签间隔多少显示
        const xAxisData = rows.map(daily => daily[xLabel]);

        let interval = 0;
        if (xAxisData.length > 15) {
            interval = xAxisData.length / 12;
        } else {
            interval = -1;
        }
        //四舍五入
        interval = Math.round(interval);

        return {
            legend: {
                data: legendData,
                selected: legendSelected,
                show: false
            },
            series: series,
            xAxis: {
                type: "category",
                data: xAxisData,
                axisLabel: {
                    interval: interval,
                    // rotate: 45
                }
            },
            yAxis: {
                type: "value"
            },
        }

    }

    function getPieOption(types, yLabels, rows) {
        const legendData = [];
        const legendSelected = {};
        const seriesType = types[0];
        const seriesData = [];

        yLabels.forEach((label, index) => {
            legendData[index] = label;
            // 默认全部选中;
            legendSelected[label] = true;

            const item = {};
            item.name = label;
            item.value = rows[0][label];
            seriesData.push(item);
        });
        return {
            legend: {
                data: legendData,
                selected: legendSelected,
                show: false
            },
            series: [
                {
                    type: seriesType,
                    data: seriesData
                }
            ]
        }
    }

    function getRadarOption(types, yLabels, rows) {
        const legendData = [];
        const legendSelected = {};
        const seriesType = types[0];
        const seriesData = [];

        yLabels.forEach((label, index) => {
            legendData[index] = label;
            // 默认全部选中;
            legendSelected[label] = true;

            const item = {};
            item.name = label;
            item.value = rows.map(daily => daily[label]);
            seriesData.push(item);
        });
        return {
            legend: {
                data: legendData,
                selected: legendSelected,
                show: false
            },
            series: [
                {
                    type: seriesType,
                    data: seriesData
                }
            ]
        }
    }

/*    // fake pie data
    columns = "白天; 晚上";
    let pieRows = [{
        "支付宝": "30",
        "微信": "30",
        "现金": "40",
        },
        {
            "支付宝": "10",
            "微信": "50",
            "现金": "40"
        }
    ];*/

    const staticOption = {
        // option
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        /*grid: {
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
        legend: {
         data: legendData,
         selected: legendSelected,
         show: false
         },
         series: series,
         xAxis: {
         type: "category",
         data: xAxisData,
         axisLabel: {
         interval: interval,
         rotate: 45
         }
         },
        yAxis: {
         type: "value"
         },*/
    };
    return Object.assign({}, staticOption, dynamicOption,
        {
            // flag
            hasTable,
            hasChart,
            tableData,

        })
}

function getTableData(xLabel, rows, columnsData) {
    const dataSource = rows.map((daily, index) => {
        daily.key = index;
        return daily;
    });
    const columns = columnsData.map((ele, index) => {
        const col = {};
        col.title = ele;
        col.dataIndex = ele;
        col.key = ele;
        col.width = 150;
        if (ele === xLabel) {
            col.fixed = 'left';
        }
        return col;
    });
    return {
        dataSource,
        columns
    }
}

export default formatOptions;


