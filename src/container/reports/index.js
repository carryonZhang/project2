import {connect} from "react-redux"
import ReportWrapper from "../../components/reports"
import {legendChange, gridInitial} from "../../action"
import {LEGEND_CHANGE, GRID_INITIAL} from "../../constants"

const mapStateToProps = (state) => ({
    options: state.reports,
});

const mapDispatchToProps = (dispatch) => ({
    onLegendChange: (type, itemInfo) => {
        if(type === LEGEND_CHANGE) {
            dispatch(legendChange(itemInfo))
        }
    },
});
/*
 App.propsType = {
 current: PropTypes.string.isRequired,
 onClickCounter: PropTypes.func
 };
 */

export default connect(mapStateToProps, mapDispatchToProps)(ReportWrapper);
