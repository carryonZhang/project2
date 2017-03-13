import {hashHistory} from 'react-router';

/**
 * 从 iframe 取参数集合
 * @returns {object}
 */
export function getParamsObject() {
    const {query} = hashHistory.getCurrentLocation();
    return query || {};
}

/**
 * 从 iframe 取某个参数
 * @param {string} key
 * @returns {*|undefined}
 */
export function getParam(key) {
    const {query} = hashHistory.getCurrentLocation();
    return query.hasOwnProperty(key) ? query.key : undefined;
}
