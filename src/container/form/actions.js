/**
 * Created by long-mac on 2017/2/27.
 */
import { CONSTANTS } from './constants';
import fetchdata from './fetchdata';

export default fetchQueryArgs = (reportId) => {
  fetchdata.getQueryArgs({reportId})
      .then((data) => {
        console.log(data);
      }).catch((message) => {
        console.log(message);
      });
};