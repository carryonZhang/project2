import React, {Component} from "react"
import styles from "./style.css"
import {hook} from "./images/images"
import {Row, Col} from "antd"


class Label extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            selected: this.props.selected
        }
    }

    handleClick() {
        this.setState({
            selected: !this.state.selected
        });

        // 参数 {itemText: isSelected}
        const item = this.props.text;
        // state不会立即更新
        const selected = !this.state.selected;
        const itemInfo = {};
        itemInfo[item] = selected;
        this.props.onLabelChange(itemInfo);
    }

    render() {
        const selected = this.state.selected;
        const currColor = this.props.color;
        return (
            <Col
                span={2}
                className={styles.label}
                onClick={this.handleClick}
            >
                <span
                    className={selected ? styles.iconSelected : styles.iconDeselected}
                    style={selected ? {backgroundColor: currColor} : {backgroundColor: "transparent"}}

                />
                <span
                    className={styles.labelText}
                >
                    {this.props.text}
                </span>

            </Col>
        )
    }
}

export default Label;
