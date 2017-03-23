import React from "react"
import Label from "./Label"
import styles from "./style.css"
import {Row} from "antd"

const Legend = ({legendSelected, onLegendChange}) => {
        // 颜色的顺序要与grid中一致
        const colors = [
            '#b83032',
            '#fa7921',
            '#73d3dd',
            '#bb9f65',
            '#024067',
            '#ded28b',
            '#4e4c67',
            '#fdf6de',
            '#63001c',
            '#ffd038',
            '#383d3b',
            '#f1f0e1',
            '#ca8622',
            '#91c7ae',
            '#393d54',
            '#ab4d49',
            '#5d737e',
            '#d48265',
            '#749f83',
            '#453354',
            '#efbfbe',
            '#354649',
            '#fe9920',
            '#a59792',
            '#c24b30',
            '#2f4554',
            '#e0a590',
            '#61a0a8',
            '#d6605c',
            '#c4ccd3',
        ];
            // ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
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
