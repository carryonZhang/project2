import { INPUT_TEXT, INIT_DATA, EXPORT_DATA } from '../../constants';

const updownReducer = (state={},action) => {
    switch (action.type){
    	case INPUT_TEXT:
			return Object.assign({},state,{previewText: action.txt});
			break;
		case INIT_DATA:
			return action.data;
        default:
            return state
    }
};

export default updownReducer;
