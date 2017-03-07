import { INPUT_YEXT } from '../../constants';

const updownReducer = (state={},action) => {
    switch (action.type){
    	case INPUT_YEXT:
			return {txt: action.txt}
			break;
        default:
            return state
    }
}

export default updownReducer;