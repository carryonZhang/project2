import React, {Component} from "react"
import styles from "./reports.css"
import ChartContent from "./ChartContent"
import ChartLegend from "./ChartLegend"

import {presentECharts} from "../../utils/showChart"

class ChartWrapper extends Component {

    render() {
        return (
            <div className={styles.charts}>
                <h1>Charts</h1>
                {/*/!*图表内容*!/
                <ChartContent />
                /!*图例*!/
                /!*<ChartLegend />*!/*/}
            </div>
        )
    }
}

export default ChartWrapper;
