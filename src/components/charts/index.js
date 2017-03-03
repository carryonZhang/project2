import React, {Component} from "react"
import styles from "./style.css"
import Grid from "./Grid"
import Legend from "./Legend"

function ChartWrapper({options}) {
    console.log("options", options);
    return (
        <div className={styles.charts}>
            <Grid options={options}/>
        </div>
    )
}

export default ChartWrapper;

