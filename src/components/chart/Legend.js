import React from "react"
import Label from "./Label"
import styles from "./style.css"
import {Row} from "antd"

const Legend = ({legendSelected, onLegendChange}) => {

        const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
        const labels = [];
        Object.keys(legendSelected).forEach((item, index) => {
            const color = colors[index % colors.length];
                const selected = legendSelected[item];
                labels.push(
                    (<Label text={item} selected={selected} color={color}
                            onLabelChange={item => onLegendChange(Object.assign(legendSelected, item))}
                            key={item}
                    />)
                );
        });

        // todo 不要删
        /*const rows = [];
        for (let index = 0; index < labels.length; index += 8) {
            rows.push(
                <Row>
                    {labels.slice(index, index + 8)}
                </Row>
            )
        }*/

        return (
            <div className={styles.legend}>
                {labels}
            </div>
        )
};

export default Legend;
