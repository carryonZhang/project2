import React, {Component} from 'react';
import ChartWrapper from "../charts"
import DataForm from "../dataform"
import DataTable from "../datatable"

import * as action from '../../action';
// 报表详情接口：
const DETAILS = {
    data: {
        axisXLabel: "日期",
        axisYLabel: "无线订单数;总订单数;外卖订单数;微信订单数;支付宝单数;app订单数;点菜数;无线订单比例;总支付笔数;微信支付笔数;支付宝支付笔数;应收金额;实收金额;微信支付金额;支付宝支付金额;微信下单金额;app下单金额;支付宝下单金额;店铺总数;4.0店铺总数;4.0店铺比例;4.0活跃店铺数;4.0店铺活跃比例;微信下单活跃店铺;支付宝下单活跃店铺;微信支付活跃店铺;支付宝支付活跃店铺;总会员;活跃会员;会员活跃率",
        id: "0606",
        name: "日常表",
        reportType: "line"
    },
    record: 66
};

//  legend
const labels = DETAILS.data.axisYLabel;
let legendData = labels.split(";");
let legendSelected = {};

// series
let series = [];
const seriesItemType = DETAILS.data.reportType;

legendData.forEach((legendName, index) => {
    // 默认选中第一项
    legendSelected[legendName] = index === 0;

    let seriesItem = {};
    seriesItem.name = legendName;
    seriesItem.type = seriesItemType;
    series.push(seriesItem);
});

/*// legendData, legendSelected, title, seriesItemType 进行初始化
 /!*const detailsOption = {
 title: DETAILS.data.name,
 legend: {
 data: legendData,
 selected: legendSelected,
 },
 series: series
 };*!/

 /!*const initialOption = this.state.options;


 this.setState(Object.assgin({}, initialOption, detailsOption));*!/*/

class ReportWrapper extends Component {
    constructor(props) {
        super(props);
        // option state 中应该是适用于所有图表类型的配置
        const detailsOption = {
            // title: DETAILS.data.name,
            grid: {
                show: false,
                left: '1%',
                right: "5%",
                top: '2%',
                bottom: "2%",
                // width: "80%",
                height: "80%",
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true
            },
            xAxis: {
                type: "category",
            },
            yAxis: {
                type: "value"
            },
            legend: {
                show: false,
                selected: legendSelected,
                data: legendData,
            },
            series: series,
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

        };
        this.state = {
            option: detailsOption
        }
    }


    componentDidMount() {
        this.props.dispatch(action.formInit());
    }

    render() {

        // data 进来之后 以及 legendChange 应在此合并
        const dataOption = this.props.option;
        console.log("dataOption", dataOption)
        const option = Object.assign({}, dataOption, this.state.option);
        console.log("component option", option);

        const onLegendChange = this.props.options;
        const onSearch = this.props.onSearch;
        const onExport = this.props.onExport;

        return (
            <div>

                <DataForm />
                <ChartWrapper options={option}/>
                {/*onLegendChange={onLegendChange}*/}
                {/*<DataTable />*/}
            </div>
        )
    }

}

/*
 App.propsType = {
 current: PropTypes.string.isRequired,
 onClickCounter: PropTypes.func
 };
 */

export default ReportWrapper;

