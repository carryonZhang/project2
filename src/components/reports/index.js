
import React, {Component, PropTypes} from 'react';
import ChartWrapper from "../charts"
import DataForm from "../dataform"
import DataTable from "../datatable"

function ReportWrapper({options, onSearch, onExport, onGridInitial, onLegendChange}) {
    console.log("args", options);
    return (
        <div>
            <DataForm />
            <ChartWrapper options={options} onLegendChange={onLegendChange}/>
        </div>
    )
}

/*
 App.propsType = {
 current: PropTypes.string.isRequired,
 onClickCounter: PropTypes.func
 };
 */

export default ReportWrapper;

