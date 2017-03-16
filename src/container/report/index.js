import React, {Component} from "react";
import {connect} from "react-redux";
import {stringify} from "querystring";
import WrapForm from '../../components/dataform';
import Report from "../../components/report/index"
/*import Chart from "../../components/chart";
 import DataTable from "../../components/datatable"*/
import Header from '../../components/header';

import * as action from "../../action";
import * as bridge from '../../utils/bridge';
import saveAs from '../../utils/saveAs';
import {currentAPIUrlPrefix} from '../../utils/env';

class ReportContainer extends Component {

    constructor(props) {
        super(props);

        const {query} = this.props.location;
        this.REPORT_ID = query.reportId;
        this.MENU_TITLE = query.menuTitle;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query.reportId !== this.REPORT_ID) {
            this.REPORT_ID = nextProps.location.query.reportId;
            this.fetchInitialData();
        }
    }

    fetchInitialData() {
        const {dispatch} = this.props;

        if (this.REPORT_ID) {
            // 初始化搜索条件
            dispatch(action.fetchSearchArgs({reportId: this.REPORT_ID}));

            // 初始化图标结构
            dispatch(action.fetchChartConstruct({reportId: this.REPORT_ID}));
        }
    }

    componentDidMount() {
        this.fetchInitialData();
    }

    render() {
        const {
            location,

            data,
            searchArgs,
            buttonState,

            onSubmitSearch, // 搜索框提交
            onExportExcel, // 导出 excel
            onFetchUnionSelect, // 联动搜索框触发
            onLegendChange // legend 修改
        } = this.props;

        this.REPORT_ID = location.query.reportId;

        return (
            <div>
                <Header title={this.MENU_TITLE}/>
                {
                    searchArgs && <WrapForm buttonState={buttonState}
                                            conditions={searchArgs}
                                            reportId={this.REPORT_ID}
                                            onSubmit={onSubmitSearch}
                                            onExportExcel={onExportExcel}
                                            onFetchUnionSelect={onFetchUnionSelect}/>
                }
                {
                    <Report data={data} onLegendChange={onLegendChange}/>
                }
            </div>
        )
    }
}

const combineOptions = (options, legend) => {
    return Object.assign({}, options, {legend})
};

const mapStateToProps = (state) => {
    return {
        buttonState: state.reports.buttonState,
        data: combineOptions(state.reports.data, state.reports.legend),
        searchArgs: state.reports.searchArgs
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    onSubmitSearch: (reportId, args) => {
        dispatch(action.fetchChartData({reportId: reportId, args}));
    },
    onLegendChange: (itemInfo) => {
        dispatch(action.setLegendChange(itemInfo))
    },
    onExportExcel: (reportId, args) => {

        const {entityId, shopCode, userId, token} = bridge.getParamsObject();

        const qs = stringify({
            ...args,
            entityId,
            reportId,
            shopCode,
            userId
        });

        saveAs(currentAPIUrlPrefix + 'report/exportXls.do?' + qs, token).then(
            filename => dispatch(action.globalMessageSuccess('导出成功!')), // 成功返回文件名
            err => {
                if (err.code === 0 && err.errorCode == '401') {

                    // 可以加提示信息
                    bridge.callParent('logout');
                    return;
                }

                dispatch(action.globalMessageError(err));
            }
        );//.then(e => this.setState({exportLock: false}));


        //dispatch(action.getExcel(reportId, args));
    },
    onFetchUnionSelect: (id, value, reportId) => {
        dispatch(action.fetchUnionSelect({
            parentValue: value,
            parentId: id,
            reportId: reportId
        }))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
