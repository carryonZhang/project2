
import React, {Component, PropTypes} from 'react';

import SearchForm from "./SearchForm"
import ChartWrapper from "./ChartWrapper"



class Reports extends Component {

    triggerRender(){

    }


  render() {
    return (
      <div>
        <SearchForm />
        <ChartWrapper />
        {/*table 牛肉饼*/}

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
