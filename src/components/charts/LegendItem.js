import React, {Component} from "react"
import styles from "./reports.css"
import {hook} from "./images/images"

export default class LegendItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isSelected: this.props.itemSelected
        }
    }

    handleClick() {
        // console.log("click")
        console.log("before toggle", this.state.isSelected);

        this.setState({
            isSelected: !this.state.isSelected
        });

        // console.log("after toggle", this.state.isSelected);

        // 参数 {itemText: isSelected}
         const item = this.props.itemText;
         // state不会立即更新
         const selected = !this.state.isSelected;
         const itemInfo = {};
         itemInfo[item] = selected;
         this.props.handleSelect(itemInfo);

         // console.log("itemInfo", itemInfo);

    }

    render() {
        const isSelected = this.state.isSelected;
        return (
            <span className="legendItem">
                <span
                    className={isSelected ? styles.legendItem : styles.legendItemDisabled}
                    style={{border: "2px solid #ccc"}} onClick={this.handleClick}
                >
                    {this.props.itemText}
                </span>
                <img src={hook} alt="" className="itemImg"/>
            </span>
        )
    }
}
