import React, {Component} from "react"
import styles from "./style.css"
import {hook} from "./images/images"



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
            <span
                className={styles.label}
                onClick={this.handleClick}
            >
                <span
                    className={selected ? styles.labelIcon : styles.deselected}
                    style={selected ? {backgroundColor: currColor} : {backgroundColor: "transparent"}}

                />
                <span
                    className={styles.labelText}
                >
                    {this.props.text}
                </span>

            </span>
        )
    }
}

export default Label;
