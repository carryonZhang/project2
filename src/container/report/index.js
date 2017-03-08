import React, {Component} from "react";
import {connect} from "react-redux";
import WrapForm from '../../components/dataform';
import Chart from "../../components/chart";
import DataTable from "../../components/datatable"

import * as action from "../../action"
import {LEGEND_CHANGE} from "../../constants"

class ReportContainer extends Component {

    componentDidMount() {
        // 初始化搜索条件
        this.props.dispatch(action.fetchSearchArgs({reportId: 1}));

        // 初始化图标结构
        this.props.dispatch(action.fetchChartConstruct({reportId: 1}));
    }

    render() {
        const self = this;
        const {
            reportId,
            data,
            searchArgs,
            onSubmitSearch,
            getExcel,
            onLegendChange
        } = this.props;

        const tableData = data.tableData;

        return (
            <div>
                {
                    searchArgs && <WrapForm conditions={searchArgs} reportId={reportId} onSubmit={onSubmitSearch} getExcel={getExcel} />
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
        data: combineOptions(state.reports.data, state.reports.legend),
        searchArgs: state.reports.searchArgs
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    onSubmitSearch: (id, data) => {
        dispatch(action.fetchChartData({reportId: 1, data}));
    },
    onLegendChange: (itemInfo) => {
        dispatch(action.setLegendChange(itemInfo))
    },
    getExcel: (id, data) => {
        action.getExcel(id, data);
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
