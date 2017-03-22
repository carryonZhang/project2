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
