
import React, {Component, PropTypes} from 'react';

import SearchForm from "../../components/charts/SearchForm"
import ChartWrapper from "../../components/charts/ChartWrapper"
import DataTable from '../../components/datatable/DataTable'
import DataForm from '../../components/dataform/DataForm'

class Reports extends Component {
  render() {
    return (
      <div>
        <DataForm />
        <ChartWrapper />
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

export default Reports;
