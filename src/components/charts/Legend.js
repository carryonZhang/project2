import React, {Component} from "react"
import Label from "./Label"
import styles from "./style.css"

function Legend({legendSelected, onLegendChange}) {
    // console.log("legendSelected", legendSelected)
    // console.log("onLegendChange", onLegendChange)
    const labels = [];
    const colors = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    const keys = Object.keys(legendSelected);
    for (let index =0; index < keys.length; index++) {
        const item = keys[index];
        const color = colors[index % colors.length];
        if (legendSelected.hasOwnProperty(item)) {
            const selected = legendSelected[item];
            labels.push(
                (<Label
                    text={item}
                    selected={selected}
                    color={color}
                    onLegendChange={onLegendChange}
                    key={item}
                />)
            );
        }
    }
    return (
        <div className={styles.chartLegend}>
            {labels}
        </div>
    )
}

export default Legend;
