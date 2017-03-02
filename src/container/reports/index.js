import {connect} from "react-redux"
import ReportWrapper from "../../components/reports"
import {legendChange} from "../../action"
import {LEGEND_CHANGE, GRID_INITIAL} from "../../constants"


const mapStateToProps = (state) => ({
    option: state.reports
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    onLegendChange: (type, itemInfo) => {
        if (type === LEGEND_CHANGE) {
            dispatch(legendChange(itemInfo))
        }
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(ReportWrapper);
