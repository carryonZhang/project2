
function getLineOrBarOption(xLabel, yLabels, type, rows, columnsData) {
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
            seriesItem.data = Object.entries(rows[0]).map(entry => ({name: entry[0], value: entry[1]}));
            series.push(seriesItem);
        } else {
            // line bar
            seriesItem.name = label;
            seriesItem.type = seriesType;
            seriesItem.data = rows.map(daily => daily[label]);
            series.push(seriesItem);
        }

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
        legend: {

        }
    };
    return Object.assign({}, staticOption, dynamicOption)
}
