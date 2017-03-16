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
                rotate: 45
            }
        },
        yAxis: {
            type: "value"
        },
    }

}
