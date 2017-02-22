import {THROW_ERROR} from './constants';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case THROW_ERROR:
      return state;
    default:
      return state
  }
};

export default loginReducer;
