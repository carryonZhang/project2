import React, {Component} from "react"
import styles from "./style.css"
import Grid from "./Grid"
import Legend from "./Legend"


class ChartWrapper extends Component {
    constructor(props) {
        super(props);

        this.triggerRender = this.triggerRender.bind(this);
        this.state = {
            // todo
            reportDetails: this.props.details,
            echartOption: {}

        }
    }


    // 获取ECharts option
    getOption() {
        // 接口获取的原始数据
        const details = this.state.reportDetails;

        const chartType = details.reportType;
        // todo 那个字段
        const data = details.rows;
        const xLabel = details.axisXLabel;
        const xData = data.map((daily) => {
            return daily[xLabel];
        });

        //  legend
        const yLabel = details.axisYLabel;
        let legendData = yLabel.split(";");
        let legendSelected = {};

        // series
        let series = [];

        // todo
        const seriesItemType = "line";

        legendData.forEach((legendName, index) => {
            // TODO 默认选中第一项
            if (index === 0) {
                legendSelected[legendName] = true;
            } else {
                legendSelected[legendName] = false;
            }


            let seriesItem = {};
            seriesItem.name = legendName;
            seriesItem.type = seriesItemType;
            seriesItem.data = data.map((daily) => {
                return daily[legendName];
            });
            series.push(seriesItem);
        });

        //获取x轴标签间隔多少显示
        let interval = 0;
        if (xData.length > 15) {
            interval = xData.length / 12;
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
                show: false,
                selected: legendSelected,
                data: legendData,
                // left: "5%",
                // right: "5%",
                // // top: "0%",
                // bottom: "0%",
                // height: "30%"
            },
            xAxis: {
                data: xData,
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

        return option;
    }

    //
    // itemInfo: {itemText: isSelected}
    triggerRender(itemInfo) {
        const option = this.state.echartOption;
        Object.assign(option.legend.selected, itemInfo);
        this.setState({
            echartOption: option
        });
    }

    componentWillMount() {
        const option = this.getOption();
        this.setState({
            echartOption: option
        });
    }

    render() {
        return (
            <div className={styles.charts}>
                <Grid option={this.state.echartOption}/>
                <Legend legend={this.state.echartOption.legend} onSelected={this.triggerRender}/>
                {/*<ChartRenderComponent　dataSource={this.state.chartDataSource}/>
                <ChartController labels={[]} onSelected={e => triggerRender}/>*/}
            </div>
        )
    }
}

export default ChartWrapper;

