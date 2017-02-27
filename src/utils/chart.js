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
    let xAxisLabel = data.graphEntity.xAxisLabel;
    let xAxisData = maps.map((daily) => {
        // console.log(daily[xAxisLabel])
        return (
            daily[xAxisLabel] //.slice(5)
        )
    });



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

    console.log("x data", xAxisData)

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
            show: false,
            left: '5%',
            right: "5%",
            top: '5%',
            // bottom: "5%",
            height: "70%",
            containLabel: true
        },
        // 设备背影色为白色, 透明度:0.1
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true
        },
        legend: {
            selected: legendSelected,
            data: legendData,
            left: "5%",
            right: "5%",
            // top: "0%",
            bottom: "0%",
            height: "30%"
        },
        xAxis: {
            data: xAxisData,
            axisLabel: {
                interval: interval,
                /*45度角倾斜显示*/
                // rotate: 45
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
    /*let option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
            selected: {
                '邮件营销':true, '联盟广告':true ,'视频广告':true ,'直接访问':false, '搜索引擎': false
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };*/

    myChart.setOption(option, true);
}
