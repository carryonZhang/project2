/**
 * Async Reducer Loader
 *
 * 系统利用 `require.ensure`，实现一个异步注入的 Reducer
 * 根据当前路由，加载并替换 Reducer （`store.replaceReducer`）
 *
 * @see /src/utils/asyncInjector.js
 */

import {combineReducers} from 'redux';
import rootReducer from './container/app/reducer';

export default function createReducer(asyncReducers) {
    return combineReducers({
        global: rootReducer,
        ...asyncReducers
    })
};
