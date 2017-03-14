import React, {Component} from "react";
import {connect} from "react-redux";
import WrapForm from '../../components/dataform';
import Chart from "../../components/chart";
import DataTable from "../../components/datatable"
import Header from '../../components/header';

import * as action from "../../action";
import * as bridge from '../../utils/bridge';

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

        const tableData = data.tableData;
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
                    data.hasChart && <Chart option={data} onLegendChange={onLegendChange}/>
                }

                {
                    data.hasTable && <DataTable dataSource={tableData.dataSource} columns={tableData.columns}/>
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
    onExportExcel: (id, data) => {
        dispatch(action.getExcel(id, data));
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
