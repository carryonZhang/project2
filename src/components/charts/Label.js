import React, {Component} from "react"
import styles from "./style.css"
import {hook} from "./images/images"
import {LEGEND_CHANGE} from "../../constants"


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
        console.log("itemInfo", itemInfo)
        this.props.onLegendChange(LEGEND_CHANGE, itemInfo);
    }

    render() {
        const selected = this.state.selected;
        return (
            <span className="legendItem">
                <span
                    className={selected ? styles.legendItem : styles.legendItemDisabled}
                    style={{border: "2px solid #ccc"}} onClick={this.handleClick}
                >
                    {this.props.text}
                </span>
                <img src={hook} alt="" className="itemImg"/>
            </span>
        )
    }
}

export default Label;
