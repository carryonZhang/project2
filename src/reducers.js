import {combineReducers} from 'redux';
import rootReducer from './container/app/reducer';



export default function createReducer(asyncReducers) {
  return combineReducers({
    global: rootReducer,
    ...asyncReducers
  })
};
