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
        option.color =
            [
                '#b83032',
                '#fa7921',
                '#73d3dd',
                '#bb9f65',
                '#024067',
                '#ded28b',
                '#4e4c67',
                // '#fdf6de',
                '#63001c',
                '#ffd038',
                '#383d3b',
                // '#f1f0e1',
                '#ca8622',
                '#91c7ae',
                '#393d54',
                '#ab4d49',
                '#5d737e',
                '#d48265',
                '#749f83',
                '#453354',
                '#efbfbe',
                '#354649',
                '#fe9920',
                '#a59792',
                '#c24b30',
                '#2f4554',
                '#e0a590',
                '#61a0a8',
                '#d6605c',
                // '#c4ccd3',
            ];
        return (
            <div className={styles.grid}>
                <ReactEcharts option={option} style={canvasSize}/>
            </div>

        )
    }
}

export default Grid;




