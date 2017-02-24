
import React, {Component, PropTypes} from 'react';

import SearchForm from "../../components/charts/SearchForm"
import ChartWrapper from "../../components/charts/ChartWrapper"
import DataTable from '../../components/datatable/DataTable.js';

class Reports extends Component {
  render() {
    return (
      <div>
        <SearchForm />
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
