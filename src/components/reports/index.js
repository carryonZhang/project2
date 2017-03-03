import React, {Component} from 'react';
import ChartWrapper from "../charts"
import Grid from "../charts/Grid"
import Legend from '../charts/Legend'
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
        // console.log(this.props.option.chartInit)
        this.state = {
            option: this.props.option.chartInit
        }
    }
    componentDidMount() {
        // this.props.dispatch(action.formInit());
        this.props.dispatch(action.fetchChartDetails());

        // const option = Object.assign({}, dataOption, this.state.option);
        // console.log("component option", option);

        const onLegendChange = this.props.options;
        const onSearch = this.props.onSearch;
        const onExport = this.props.onExport;
    }

    render() {
        // console.log(this.props.option.chartInit)
        const option = Object.assign({}, this.state.option, this.props.option.chartInit);
        // console.log(option);
        return (
            <div>
                <DataForm />
                <Grid option={option}/>
                {
                    option.legend ?
                        <Legend legendSelected={option.legend.selected}/> :
                        ""
                }
                onLegendChange={onLegendChange}
                <DataTable />
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

