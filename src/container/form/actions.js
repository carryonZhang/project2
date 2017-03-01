/**
 * Created by long-mac on 2017/2/27.
 */
import { CONSTANTS } from '../../constants/constants';
import fetchdata from './fetchdata';

export const fetchQueryArgs = (reportId) => {
  fetchdata.getQueryArgs({reportId})
      .then((data) => {
        console.log(data);
      }).catch((message) => {
        console.log(message);
      });
};
