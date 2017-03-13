import {hashHistory} from 'react-router';

export function getQueryObject() {
    const {query} = hashHistory.getCurrentLocation();
    return query || {};
}
