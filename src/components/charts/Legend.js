import React, {Component} from "react"
import LegendItem from "./LegendItem"
import styles from "./style.css"

class Legend extends Component {

    constructor(props) {
        super(props);

        const legendSelected = this.props.legend.selected;
        const legendData = this.props.legend.data;
        this.state = {
            selected: legendSelected,
            data: legendData
        }
    }
    // handleSelect = this.props.hadnleSelect

    getItems() {
        return this.state.data.map((item, index) => {
            const itemSelected = this.state.selected[item];
            return (<LegendItem itemText={item} itemSelected={itemSelected} handleSelect={this.props.onSelected} key={`item-${index}`}/>)
        })
    }
    render() {
        return (
            <div className={styles.chartLegend} >
                {this.getItems()}
            </div>
        )
    }
}

export default Legend;
