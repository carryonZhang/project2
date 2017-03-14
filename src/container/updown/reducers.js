import { INPUT_TEXT, INIT_DATA, EXPORT_DATA, IMPORT_INFO} from '../../constants';

const updownReducer = (state={},action) => {
    switch (action.type){
    	case INPUT_TEXT:
			return Object.assign({},state,{previewText: action.txt});
			break;
		case INIT_DATA:
			return action.data;
		case IMPORT_INFO:
			return Object.assign({},state,{importInfo:action.data});
        default:
            return state
    }
};

export default updownReducer;
