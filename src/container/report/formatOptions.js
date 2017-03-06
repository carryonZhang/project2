import {LINE, BAR, PIE, RADAR, TABLE} from "../../constants/index"

function formatOptions(details, data) {

    const DETAILS = details;
    const DATA = data;

    const xLabel = DETAILS.axisXLabel;
    const yLabels = DETAILS.axisYLabel.split(";");
    const types = DETAILS.reportType.toLowerCase();

    const rows = DATA.rows;
    const columnsData = DATA.columns;

    // legend and series
    const legendData = [];
    let legendSelected = {};
    const series = [];
    let seriesItemType;

    // todo 是否必然有表格
    let hasTable = false;
    let hasChart = false;
    if (types.indexOf(TABLE) > -1) {
        hasTable = true;
    }

    if (types.indexOf(LINE) > -1) {
        seriesItemType = LINE;
        hasChart = true;
    } else if (types.indexOf(BAR) > -1) {
        seriesItemType = BAR;
        hasChart = true;
    } else if (types.indexOf(PIE) > -1) {
        seriesItemType = PIE;
        hasChart = true;
    } else if (types.indexOf(RADAR) > -1) {
        seriesItemType = RADAR;
        hasChart = true;
    }
    hasChart = true;

    // table start
    const dataSource = rows.map((daily, index) => {
        daily.key = index;
        return daily;
    });
    const columns = columnsData.map((ele, index) => {
        const col = {};
        col.title = ele;
        col.dataIndex = ele;
        col.key = ele;
        col.width = 100;
        if(ele === xLabel) {
            console.log("texst")
            col.fixed = 'left';
        }
        return col;
    });
    // table end

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
        // flag
        hasTable: hasTable,
        hasChart: hasChart,
        tableData: {dataSource, columns},

        // option
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
        },
    }
}
function getChartOption() {

}

function getTableData() {

}

export default formatOptions;


