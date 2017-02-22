import {hashHistory} from 'react-router';

import {
  LOGIN_FAILURE
} from './constants';

import {
  globalLoading,
  globalLoadingHide,
  globalMessageError
} from '../app/action';

import api from './api';

export const login = (formData) => {
  return (dispatch) => {

    const {userName, password, remember} = formData;

    api.login({
      username: userName,
      password,
      remember
    }).then(e => {

      // 登录成功，跳转到店铺选择页
      hashHistory.push('/brands');

    }).catch(e => dispatch(globalMessageError('登录请求失败，请检查网络')));
  }
};


export const loginFailure = (errMessage) => ({
  type: LOGIN_FAILURE,
  errMessage
});
