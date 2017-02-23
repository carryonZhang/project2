import React, {Component} from "react"
import ChartContent from "./ChartContent"
import ChartLegend from "./ChartLegend"

import {presentECharts} from "../utils/showChart"

class Charts extends Component {

    render() {
        return (
            <div>
                <h1>Charts</h1>
                {/*图表内容*/}
                <ChartContent />
                {/*图例*/}
                <ChartLegend />
            </div>
        )
    }
}

export default Charts;
