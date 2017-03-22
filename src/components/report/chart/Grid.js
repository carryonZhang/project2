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
        const option = this.props.option;
        option.color = ['#bb9f65',
            '#ded28b',
            '#b83032',
            '#fdf6de',
            '#024067',
            '#4e4c67',
            '#63001c',
            '#f1f0e1',
            '#ffd038',
            '#383d3b',
            '#5d737e',
            '#fa7921',
            '#73d3dd',
            '#fe9920',
            '#354649',
            '#2f4554',
            '453354',
            '#393d54',
            '#61a0a8',
            '#c4ccd3',
            '#c24b30',
            '#ca8622',
            '#ab4d49',
            '#d6605c',
            '#efbfbe',
            '#749f83',
            '#91c7ae',
            '#d48265',
            '#e0a590',
            '#a59792'];
        return (
            <div className={styles.grid}>
                <ReactEcharts option={option} style={canvasSize} />
            </div>

        )
    }
}

export default Grid;




