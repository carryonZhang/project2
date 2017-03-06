import React, {Component} from "react";
import {connect} from "react-redux";
import {Table} from "antd";

import Chart from "../../components/chart";
import WrapForm from '../../components/dataform';

import * as action from "../../action"
import {LEGEND_CHANGE} from "../../constants"

class ReportContainer extends Component {

    componentDidMount() {
        this.props.dispatch(action.fetchSearchArgs({reportId: 1}));
    }

    onSubmitSearch_TEMP() {
        this.props.dispatch(action.fetchChartsConfig({reportId: 1}));
    }

    render() {
        const self = this;
        const {
            reportId,
            searchArgs,
            onSubmit,

            combinedOptions,
            onLegendChange
        } = this.props;

        const tableData = combinedOptions.tableData;
        return (
            <div>
                {searchArgs && <WrapForm conditions={searchArgs} reportId={reportId} onSubmit={onSubmit}/>}

                <button onClick={self.onSubmitSearch_TEMP.bind(self)}> fetch data</button>

                {
                    combinedOptions.hasChart && <Chart option={combinedOptions} onLegendChange={onLegendChange}/>
                }

                {
                    combinedOptions.hasTable &&
                    <Table
                        dataSource={tableData.dataSource}
                        columns={tableData.columns}
                        scroll={{x: 1500, y: 300}}
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
        searchArgs: state.reports.searchArgs,
        combinedOptions: combineOptions(state.reports.option, state.reports.legend)
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    onSubmitSearch: (id, data) => {
        dispatch(action.fetchChartsConfig({id, data}));
    },
    onLegendChange: (type, itemInfo) => {
        if (type === LEGEND_CHANGE) {
            dispatch(action.receiveLegendChange(itemInfo))
        }
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
