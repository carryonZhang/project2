import {CHART_INIT} from "../../constants"


const legendChange = (state = {}, action) => {
    switch (action.type) {
        case CHART_INIT:
            return action.details;
        default:
            return state;
    }
};

export default chartInitialReducer;
