import React, {Component} from "react"
import styles from "./style.css"

import {Col} from "antd"

const Label = ({text, selected, color, onLabelChange}) => (
    <Col span={2} className={styles.label} onClick={e => onLabelChange({[text]: !selected})}>
        <span className={selected ? styles.iconSelected : styles.labelIcon}
              style={{backgroundColor: selected ? color : 'transparent'}}/>
        <span className={styles.labelText}>{text}</span>
    </Col>
);

export default Label;
