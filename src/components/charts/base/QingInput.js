
import React, {Component} from "react"
import {Input, message} from "antd"
import styles from "./base.css"

export default class QingInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        message.info("input value");
    }

    render() {
       return (
           <div>
               <label htmlFor="" className={styles.controlLabel}>搜索框</label>
               <Input size="small" placeholder="卡号、姓名、手机号" onChange={this.handleChange} style={{width: "160px"}}/>
           </div>
       )
    }
}
