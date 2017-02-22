import {LOGIN_FAILURE} from './constants';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return state;
    default:
      return state
  }
};

export default loginReducer;
