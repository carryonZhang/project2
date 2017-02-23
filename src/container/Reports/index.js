
import React, {Component, PropTypes} from 'react';

import SearchForm from "../../components/SearchForm"
import Charts from "../../components/Charts"

require("./reports.css");

class Reports extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <Charts />
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
