import sortBy from "../../utils/sortBy"
const TABLE = "table";
const LINE = "line";
const BAR = "bar";
const PIE = "pie";
const RADAR = "radar";
const allCharts = [LINE, BAR, RADAR, PIE];

function formatOptions(details, data) {
    // 接口数据： xLabel, yLabels, types, rows, footRows, columns
    const DETAILS = details;
    const xLabel = DETAILS.axisXLabel;
    const yLabels = DETAILS.axisYLabel.split(";").map(label => label.trim());
    const types = DETAILS.reportType.toLowerCase().split(",").map(type => type.trim());

    const DATA = data;
    const rows = DATA.rows;
    const columnsData = DATA.columns;
    const footRows = DATA.footRows[0];
    const hasCut = !!DATA.haveCut;

    // 标识变量
    // 没有响应
    let hasError = Object.keys(DATA).length < 1;
    // 响应但是无有效数据
    let hasNullData = rows.length < 1;
    // 是否有 chart:
    let hasChart = false;
    let hasTable = false;
    // table
    let tableData;
    if (types.includes(TABLE) && rows.length > 0) {
        hasTable = true;
        tableData = getTableData(xLabel, rows, columnsData, footRows, hasCut);
        types.splice(types.indexOf(TABLE), 1);
    }
    // chart
    let chartOption;

    if (allCharts.includes(types[0]) && rows.length > 0) {
        hasChart = true;
        const chartType = types[0];
        switch (chartType) {
            case LINE:
                chartOption = getLineOrBarOption(xLabel, yLabels, chartType, rows, columnsData);
                break;
            case BAR:
                chartOption = getLineOrBarOption(xLabel, yLabels, chartType, rows, columnsData);
                break;
            case PIE:
                chartOption = getPieOption(xLabel, yLabels, chartType, rows, columnsData);
                break;
            case RADAR:
                // chartOption = getRadarOption(xLabel, yLabels, type, rows, columnsData);
                alert("不处理")
                break;
        }
    }

    return Object.assign({},
        chartOption,
        {
            hasError,
            hasNullData,
            hasChart,
            hasTable,
            tableData,
        });
}

function getLineOrBarOption(xLabel, yLabels, type, rows) {

    // 对 rows 按xlabel进行排序
    rows.sort(sortBy(xLabel));

    // legend and series
    const legendData = [];
    let legendSelected = {};
    const series = [];
    let seriesItemType = type;

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
        color: ['#bb9f65', '#ded28b', '#b83032', '#fdf6de', '#024067', '#4e4c67', '#63001c', '#f1f0e1', '#ffd038', '#383d3b', '#5d737e', '#fa7921', '#73d3dd', '#fe9920', '#354649', '#2f4554', '453354', '#393d54', '#61a0a8', '#c4ccd3', '#c24b30', '#ca8622', '#ab4d49', '#d6605c', '#efbfbe', '#749f83', '#91c7ae', '#d48265', '#e0a590', '#a59792'],
        legend: {
            data: legendData,
            selected: legendSelected,
            show: false
        },
        series: series,
        tooltip: {
            trigger: "axis"
        },
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
        },
    }

}

function getPieOption(xLabel, yLabels, type, rows) {
    const legendData = [];
    const legendSelected = {};
    const seriesType = type;
    const seriesData = [];


    rows.forEach((daily, index) => {
        const category = daily[xLabel];
        legendData[index] = category;
        legendSelected[category] = true;

        const item = {};
        item.name = category;
        item.value = daily[yLabels];
        seriesData.push(item);
    });

    /*    yLabels.forEach((label, index) => {
     legendData[index] = label;
     // 默认全部选中;
     legendSelected[label] = true;

     const item = {};
     item.name = label;
     item.value = rows[0][label];

     seriesData.push(item);
     });*/

    return {
        legend: {
            data: legendData,
            selected: legendSelected,
            show: false
        },
        series: [
            {
                radius: "55%",
                type: seriesType,
                data: seriesData
            }
        ],
        tooltip: {
            trigger: "item"
        }
    }
}

function getTableData(xLabel, rows, columnsData, footRows, hasCut) {
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
        if (index === 0) {
            col.fixed = 'left';
        }
        return col;
    });

    return {
        dataSource,
        columns,
        hasCut
    }
}

function sortDate(dates) {
    // 日期输入格式是 YYYY-MM-DD
    // const dates = ["2014-12-04","2014-12-05","2014-12-01", "2014-12-02", "2014-12-03"]
    const parsedDates = dates.map(date => Date.parse(date));
    parsedDates.sort((a, b) => {
        return a - b
    })
    const sortedDates = parsedDates.map(time => {
        return new Date(time);
    });
    // console.log(sortedDates)
    const newDates = sortedDates.map(date => {
        console.log(date.getYear());
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    });
    // console.log(newDates)
    return newDates
}

export default formatOptions;

