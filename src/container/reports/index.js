import {connect} from "react-redux"
import ReportWrapper from "../../components/reports"
import * as action from "../../action"

const mapStateToProps = (state) => ({
    details: state,
    legends: state,
});

const mapDispatchToProps = (dispatch) => ({
    onLegendChange: () => {
        dispatch(action.chartInit)
    }
});
/*
 App.propsType = {
 current: PropTypes.string.isRequired,
 onClickCounter: PropTypes.func
 };
 */

export default connect(mapStateToProps, mapDispatchToProps)(ReportWrapper);
