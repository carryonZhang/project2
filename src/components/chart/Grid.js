import React, {Component} from "react"
import ReactEcharts from "echarts-for-react"
import styles from "./style.css"


class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasSize: {
                width: document.documentElement.clientWidth - 100,
                height: "400px"
            }
        }
    }

    componentDidMount() {
        window.onresize = () => {
            this.setState({
                canvasSize: {
                    width: document.documentElement.clientWidth - 100,
                    height: "400px"
                }
            });
        };
    }

    render() {
        const canvasSize = this.state.canvasSize;
        return (
            <div className={styles.grid}>
                <ReactEcharts option={this.props.option} style={canvasSize}/>
            </div>

        )
    }
}

export default Grid;




