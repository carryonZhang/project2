import {connect} from "react-redux"
import ReportWrapper from "../../components/reports"
import * as action from '../../action'
const mapStateToProps = (state) => {
  // console.log('container中的state', state);
  return {
    conditions: state.reports.form.querys,
    reportId: state.reports.reportId
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
     dispatch,
     onSubmit:  (id, data) => {
       dispatch(action.getReport(id, data));
     }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportWrapper);