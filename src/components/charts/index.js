import React, {Component} from "react"
import styles from "./style.css"
import Grid from "./Grid"
import Legend from "./Legend"

function ChartWrapper({options, onLegendChange}) {
    console.log("options", options);
    return (
        <div className={styles.charts}>
            <Grid options={options}/>
            <Legend legendSelected={options.legend.selected} />
            {/*onLegendChange={onLegendChange}*/}
        </div>
    )
}

export default ChartWrapper;

