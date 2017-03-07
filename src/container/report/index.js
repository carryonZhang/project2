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

    onSubmitSearch_TEMP() {
        this.props.dispatch(action.fetchChartData({reportId: 1, arg1: '1', arg2: '2'}));
    }

    render() {
        const self = this;
        const {
            reportId,
            searchArgs,
            onSubmit,

            data,
            onLegendChange
        } = this.props;

        const tableData = data.tableData;

        return (
            <div>
                {searchArgs && <WrapForm conditions={searchArgs} reportId={reportId} onSubmit={onSubmit}/>}

                <button onClick={self.onSubmitSearch_TEMP.bind(self)}> fetch data</button>

                {
                    data.hasChart && <Chart option={data} onLegendChange={onLegendChange}/>
                }

                {
                    data.hasTable &&
                    <DataTable
                        dataSource={tableData.dataSource}
                        columns={tableData.columns}
                    />
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
        dispatch(action.fetchChartData({id, data}));
    },
    onLegendChange: (itemInfo) => {
        dispatch(action.setLegendChange(itemInfo))
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
