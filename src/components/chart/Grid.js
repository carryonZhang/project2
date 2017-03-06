import React, {Component} from "react"
import ReactEcharts from "echarts-for-react"


class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasSize: {
                width: document.documentElement.clientWidth - 100,
                height: "300px"
            }
        }
    }

    // 窗口resize后 reset echart
    resizeReset() {
        this.setState({
            canvasSize: {
                width: document.documentElement.clientWidth - 100,
                height: "300px"
            }
        });
    }

    componentDidMount() {
        const self = this;
        window.onresize = function () {
            self.resizeReset();
        };
        /*// 显示报表
         const reportContent = this.state.reportContent;
         // 报表类型
         let chartType = reportContent.queryType;
         showChart(chartType, reportContent, "chart-canvas");


         // chartType = chartType.toUpperCase();

         // presentECharts("_LINE", reportContent);

         /!*!// 表格
         if (chartType === "TABULAR") {

         // 显示chart-table

         // 隐藏chart-panel

         showTable(reportContent);
         } else {
         // 图表

         // 显示chart-panel

         // 参数： chartType, data
         presentECharts("_LINE", reportContent);

         /!*if (chartType.indexOf("_DATA") > 0) {
         // 显示chart-table

         showTable(reportContent);
         } else {
         // 隐藏chart-table

         }*!/
         }*!/*/
    }

    render() {
        const canvasSize = this.state.canvasSize;
        return (
            <div>
                <ReactEcharts
                    option={this.props.option}
                    style={canvasSize}
                />
            </div>

        )
    }
}

export default Grid;




