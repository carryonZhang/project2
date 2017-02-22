import {combineReducers} from 'redux';
import rootReducer from './container/App/reducer';


export default function createReducer(asyncReducers) {
  return combineReducers({
    global: rootReducer,
    ...asyncReducers
  })
};
