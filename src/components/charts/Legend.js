import React, {Component} from "react"
import Label from "./Label"
import styles from "./style.css"

function Legend({legendSelected, onLegendChange}) {

    const labels = [];
    for (let item in legendSelected) {
        if (legendSelected.hasOwnProperty(item)) {
            const selected = legendSelected[item];
            labels.push(
                (<Label text={item}
                       selected={selected}
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
