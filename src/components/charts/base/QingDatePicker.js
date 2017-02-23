
import React, {Component} from "react"
import {DatePicker, message} from "antd"
import styles from "./base.css"

export default class QingDatePicker extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, dateSting) {
        message.info("selected time", value)
        message.info("fomatted time string", dateSting)
    }

    render() {
        return (
            <div style={{display: "inline-block"}}>
                <label htmlFor="" className={styles.controlLabel}>开始时间</label>
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择时间"
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}


