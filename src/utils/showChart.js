var echarts = require("echarts/lib/echarts");
// 按需引入图表
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");

import {sortBy, isNull, toDecimal, getRandomColor} from "./common";
import {hook} from "../images/images";


// 查询条件
let queryData = "";
let legendDivHeight = 0;

// 图表配置项

// option series
let series = [];


function presentECharts(chartType, data) {

    /*console.log("showECharts")
     console.log(chartType)
     console.log(data)*/



    // 数据
    let keys = data.keys;
    let maps = data.maps;

    // 基于准备好的dom，初始化echarts实例
    let optionObj;
    let myChart;
    if (myChart == null) {
        myChart = echarts.init(document.getElementById('chart-canvas'), 'purple-passion');
    }

    // legend option: data, color, selected
    let legendData = [];
    let legendColor = [];
    let legendSelected = {};

    // seriesItem: type
    let seriesItemType = 'line';

    let isAscSort = true;

    /**线图*/
    if (chartType.indexOf("_LINE") > 0 ||
        chartType.indexOf("_BAR") > 0) {

        if (chartType.indexOf("_BAR") > 0) {
            seriesItemType = 'bar';
            isAscSort = false;
        }


        // xAxisLabel
        let xAxisLabel = data.graphEntity.xAxisLabel;
        let INDEX = xAxisLabel; // allkeys.indexOf(xAxisData);

        // 按指定字段(INDEX)升序排列maps 排序
        if (isAscSort) {
            maps.sort(sortBy(INDEX));
        }

        // x 轴的文本标签， 具体日期
        // todo 确认返回的数据中是 null 或 undefined
        let xAxisData;
        let nullVal = "  ";
        // x 文本标签数组
        xAxisData = maps.map((daily) => {
            // 空值替换为空格
            return (
                isNull(daily[INDEX]) ?
                    nullVal :
                    daily[INDEX]
            )
        });

        // 所有图例标签
        legendData = (data.graphEntity.yAxisLabel).split(";");
        console.log(legendData);
        // series 这里必须重新设置为空 ?
        series = [];
        legendData.forEach((legendName, indx) => {

            // 默认选中第一项
            /*if (indx === 0) {
                legendSelected[legendName] = true;
            }*/
            // fixme 选中所有
            legendSelected[legendName] = true;

            // legendSelected[legendName] = (indx === 0);

            // series item
            let seriesItem = {};
            seriesItem.name = legendName;
            seriesItem.type = seriesItemType;
            seriesItem.data = maps.map((daily) => {
                return daily[legendName];
            });
            series.push(seriesItem);
            /*   //查询该指标在所有指标中的位置
             // fixme index改成了 key
             INDEX = ele // keys.indexOf(ele);
             */
        });


        /*    if (isAscSort) {

         } else {
         // todo  是否与 if 重复
         let nullVal = "  ";
         xAxisData = maps.map((item, indx) => {
         return (
         isNull(item[INDEX]) ?
         nullVal :
         item[INDEX]
         )
         });

         legendData.forEach((ele, indx) => {
         let seriesObj = {};

         //series 名称
         seriesObj.name = ele;

         //查询该指标在所有指标中的位置
         INDEX = keys.indexOf(ele);

         //series 类型
         seriesObj.seriesItemType = seriesItemType;

         legendSelected[ele] = (indx === 0);

         //series数据
         seriesObj.data = maps.map((ele, indx) => {
         return ele[INDEX];
         });

         series.push(seriesObj);
         });
         }*/

        //获取x轴标签间隔多少显示
        let interval = 0;
        if (xAxisData.length > 15) {
            interval = xAxisData.length / 12;
        } else {
            interval = -1;
        }
        //四舍五入
        interval = Math.round(interval);

        // 指定图表的配置项和数据
        optionObj = {
            grid: {
                left: '15%',
                right: '1px',
                top: '5%'
            },
            /*设备背影色为白色, 透明度:0.1*/
            backgroundColor: 'rgba(255,255,255, 0.1)',
            tooltip: {
                show: false,
                trigger: 'axis'
            },
            toolbox: {
                show: false
            },
            legend: {
                /*默认只有第一个显示*/
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
                        if (value >= 10000) {
                            return toDecimal(value / 10000) + "万";
                        } else {
                            return value;
                        }
                    }
                }
            },
            series: series
        };
    }
    /**饼图*/
    else if (chartType.indexOf("_PIE") > 0) {
        console.log("PIE")
        // todo hide chart tools
        // todo hide switchBar
        // todo hide switchLine

        // fixme 饼图的假数据
        data.graphEntity.xAxisLabel = "日期";
        data.graphEntiry.yAxisLabel = "无线订单数";

        seriesItemType = 'pie';
        series = []; //这里必须重新设置为空

        //
        let xAxisLabel = data.graphEntity.xAxisLabel;
        let yAxisLabel = data.graphEntity.yAxisLabel;

        /*    INDEX = -1;
         INDEX = keys.indexOf(item);
         */
        maps.forEach((daily, indx) => {

            let seriesItem = {};

            legendData[indx] = isNull(daily[xAxisLabel]) ?
                " " :
                daily[xAxisLabel];

            /*自定义生成颜色*/
            legendColor[indx] = getRandomColor();
            // 默认全部选中
            legendSelected[daily[xAxisLabel]] = true;

            seriesItem.name = daily[xAxisLabel];
            seriesItem.value = daily[yAxisLabel];
            series.push(seriesItem);
        });

        optionObj = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: legendColor,
            legend: {
                show: false,
                selected: legendSelected,
                data: legendData
            },
            series: [
                {
                    name: data.graphEntity.yAxisLabel,
                    type: 'pie',
                    radius: '55%',
                    data: series,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    } else if (chartType.indexOf("_AREA") > 0) {
        console.log("AREA")
        // seriesItemType = 'area';
    }

    /**使用刚指定的配置项和数据显示图表 */
    //test begin
    let option = {
        title: {
            text: '未来一周气温变化',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高气温', '最低气温']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name: '最高气温',
                type: 'line',
                data: [11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
            {
                name: '最低气温',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    // test end
    myChart.setOption(optionObj, true);
    // document.getElementById("legend-list").innerHTML = "";
    // $("#legend-list").html(""); //防止多次查询,重复添加

    console.log("current selected", optionObj.legend.selected)

    /*让按钮为收起状态*/
    // var optName = $(".unfold-fold-legend");
    // var optImg = $(".unfold-fold-legend-images");
    // optName.text("收起");
    // optImg.removeClass("glyphicon-chevron-down");
    // optImg.addClass("glyphicon-chevron-up");

    /*legendData.forEach(function (item, index) {
        var color = "#ffffff";
        if (seriesItemType == 'line' || seriesItemType == 'bar') {
            color = myChart.getModel().getSeriesByIndex(index).getData().getVisual('color');
        } else if (seriesItemType == 'pie') {
            color = legendColor[index];
        }

        /!*var labelHtml = '<label class="legend';
         if (index == 0 || seriesItemType == 'pie') {
         labelHtml += '">';
         labelHtml += '<span class="label" style="border: solid 2px #ccc; display: none;"></span>';
         labelHtml += '<images  class="label-images" style="background-color: ' + color + '" src="[[${ctx}]]_resources/images/hook.png" />';
         } else {
         labelHtml += ' disabled">';
         labelHtml += '<span class="label" style="border: solid 2px #ccc;"></span>';
         labelHtml += '<images  class="label-images" style="background-color: ' + color + '; display: none;" src="[[${ctx}]]_resources/images/hook.png" />';
         }

         labelHtml += '<span class="label-name">' + item + '</span></label>';*!/

        const labelHtml = `
      <label class="legend">
        <!--<span class="label" style="border: solid 2px #ccc"></span>-->
        <!--<img src={hook} alt="" class="label-images" style="backgrond-color: #fff">-->
        <span class="label-name">${item}</span>
      </label>
    `

        var labelLegend = document.createElement("span");
        labelLegend.innerHTML = labelHtml;

        var isDisabled;
        labelLegend.addEventListener("click", function(){
            console.log("labelLegend click")

            labelLegend.classList.toggle("disabled");
            isDisabled = labelLegend.classList.contains("disabled");
            legendSelected[item] = !isDisabled;
            /!*if(disable) {
                labelLegend.querySelector(".label").style.display = "inline";
                labelLegend.querySelector(".label-images").style.display = "none";
            } else {
                labelLegend.querySelector(".label").style.display = "none";
                labelLegend.querySelector(".label-images").style.display = "inline";
            }*!/
            console.log(legendSelected);
            console.log("selected", optionObj.legend.selected);
            /!*重新设置显示图例*!/
            optionObj.legend.selected = legendSelected;
            myChart.setOption(optionObj);
        });

        /!*var disable;
        labelLegend.click(function () {
            labelLegend.toggleClass('disabled');
            disable = labelLegend.hasClass('disabled');
            legendSelected[l] = !disable;
            if (disable) {
                labelLegend.find(".label").show();
                labelLegend.find(".label-images").hide();
            } else {
                labelLegend.find(".label").hide();
                labelLegend.find(".label-images").show();
            }


            /!*重新设置显示图例*!/
            optionObj.legend.selected = legendSelected;
            myChart.setOption(optionObj);
        });*!/


        document.getElementById("legend-list").appendChild(labelLegend);
    });

    /!*保存legend层的高度*!/
    legendDivHeight = document.getElementById("legend-list").style.height;*/
}

function showTable(data) {
    // ant design
    // easyUIDataGrid()
}

export {presentECharts, showTable};
