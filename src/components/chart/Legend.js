import React, {Component} from "react"
import Label from "./Label"
import styles from "./style.css"
import LEGEND_CHANGE from "../../constants/index"

class Legend extends Component {
    constructor(props) {
        super(props);
        this.onLabelChange = this.onLabelChange.bind(this);
    }

    onLabelChange(item) {
        const {legendSelected, onLegendChange} = this.props;
        const newLegendSelected = Object.assign(legendSelected, item); //(item);
        onLegendChange(LEGEND_CHANGE, newLegendSelected);
    }

    render() {
        const {legendSelected, onLegendChange} = this.props;
        const colors = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
        const labels = [];
        const keys = Object.keys(legendSelected);
        for (let index =0; index < keys.length; index++) {
            const item = keys[index];
            const color = colors[index % colors.length];
            if (legendSelected.hasOwnProperty(item)) {
                const selected = legendSelected[item];
                labels.push(
                    (<Label
                        text={item}
                        selected={selected}
                        color={color}
                        onLabelChange={this.onLabelChange}
                        key={item}
                    />)
                );
            }
        }

        return (
            <div className={styles.chartLegend}>
                {labels}
            </div>
        )

    }
}

function Legend({legendSelected, onLabelChange}) {





}
export default Legend;
