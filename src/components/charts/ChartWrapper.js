import React, {Component} from "react"
import styles from "./reports.css"
import ChartContent from "./ChartContent"
import ChartLegend from "./ChartLegend"

import {presentECharts} from "../../utils/showChart"

class ChartWrapper extends Component {

    render() {
        return (
            <div className={styles.charts}>

                <ChartContent />

                {/*<ChartLegend />*/}
            </div>
        )
    }
}

export default ChartWrapper;
