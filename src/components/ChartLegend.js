import React, {Component} from "react"

class ChartLegend extends Component {

    render() {
        return (
            <div id="charr-legend">
                <h1>chart legend</h1>
                <span className="legend-head">统计指标</span>
                <div id="legend-list"></div>
            </div>
        )
    }
}

export default ChartLegend;
