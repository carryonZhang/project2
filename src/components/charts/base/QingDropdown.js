
import React, {Component} from "react"
import {Menu, Dropdown, Button, Icon, message} from "antd"
import styles from "./base.css"

export default class QingDropdown extends Component {
    constructor(props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleButtonClick(e) {
        message.info("click on left button")
    }
    handleMenuClick(e) {
        message.info("click on menu item")
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">Menu Item 1</Menu.Item>
                <Menu.Item key="2">Menu Item 2</Menu.Item>
                <Menu.Item key="3">Menu Item 3</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <label htmlFor="" className={styles.controlLabel}>店铺名称</label>
                <Dropdown.Button onClick={this.handleButtonClick}
                    overlay={menu}
                >
                    DropDown
                </Dropdown.Button>
            </div>
        )
    }
}
