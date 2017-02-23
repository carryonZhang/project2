import {
  GLOBAL_MESSAGE_ERROR,
  GLOBAL_MESSAGE_LOADING,
  GLOBAL_MESSAGE_LOADING_HIDE,
  GLOBAL_MESSAGE_SUCCESS
} from './constants';


const rootReducer = (state = {type: '', message: ''}, action) => {
  let type = '';

  switch (action.type) {
    case GLOBAL_MESSAGE_ERROR:
      return {type: 'error', message: action.message};

    case GLOBAL_MESSAGE_SUCCESS:
      return {type: 'success', message: action.message};

    case GLOBAL_MESSAGE_LOADING:
      return {type: 'loading'};

    case GLOBAL_MESSAGE_LOADING_HIDE:
      return {type: 'loadingHide'};

    default:
      return state;
  }
};

export default rootReducer;
