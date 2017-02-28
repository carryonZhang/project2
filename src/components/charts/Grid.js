import React, {Component} from "react"
import ReactEcharts from "echarts-for-react"


class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasSize: this.getCanvasSize(),
            echartOption: this.props.option,
        }
    }


    // 窗口resize后 reset echart
    resizeReset() {
        console.log("resize reset");
        this.setState({
            canvasSize: this.getCanvasSize()
        });
    }

   getCanvasSize() {
        // 设置chart canvas 宽高
        const clientWidth = document.documentElement.clientWidth;
        const canvasWidth = clientWidth - 100;
        const canvasHeight = "300px";

        return {
            width: canvasWidth,
            height: canvasHeight
        };
    }

    componentDidMount() {
        const that = this;
        // resize
        window.onresize = function () {
            console.log("resize");
            that.resizeReset();
        };

        // this.setOption();

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
        const option = this.state.echartOption;
        return (
            /*            <div>
             <div className="chart-canvas"
             id="chart-canvas"
             style={{
             width: canvasWidth,
             height: "300px" ,
             }}
             />
             <div className="chart-legend" />
             </div>*/
            <div>
                <ReactEcharts
                    option={option}
                    style={canvasSize}
                    className="react_for_echarts"
                />

            </div>

        )
    }
}

export default Grid;




