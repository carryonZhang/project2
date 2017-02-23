var echarts = require("echarts/lib/echarts");
// 按需引入图表
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");

export default function showChart(type, data, rootId) {
    // 数据
    let keys = data.keys;
    let maps = data.maps;

    // 初始化
    let myChart = echarts.init(document.getElementById(rootId));

    let seriesItemType = "line";

    // x 轴
    let xAxisData = data.graphEntity.xAxisLabel;


    // legend and series
    let legendData = (data.graphEntity.yAxisLabel).split(";");
    let legendSelected = [];
    let series = [];

    legendData.forEach((legendName, indx) => {

        legendSelected[legendName] = true;

        // series item
        let seriesItem = {};
        seriesItem.name = legendName;
        seriesItem.type = seriesItemType;
        seriesItem.data = maps.map((daily) => {
            return daily[legendName];
        });
        series.push(seriesItem);

    });

    //获取x轴标签间隔多少显示
    let interval = 0;
    if (xAxisData.length > 15) {
        interval = xAxisData.length / 12;
    } else {
        interval = -1;
    }
    //四舍五入
    interval = Math.round(interval);

    let option = {
        grid: {
            left: '15%',
            right: '1px',
            top: '5%',
            containeLabel: true
        },
        /*设备背影色为白色, 透明度:0.1*/
        /*tooltip: {
            show: false,
            trigger: 'axis'
        },
        toolbox: {
            show: false
        },*/
        legend: {
            selected: legendSelected,
            data: legendData
        },
        xAxis: {
            data: xAxisData,
            axisLabel: {
                interval: interval,
                /*45度角倾斜显示*/
                rotate: 45
            }
        },
        yAxis: {
            //min: 'dataMin', /*将数据最小值作为开始值*/
            axisLabel: {
                formatter: function (value) {
                    return value
                }
            }
        },
        series: series
    };

    myChart.setOption(option, true);
}
