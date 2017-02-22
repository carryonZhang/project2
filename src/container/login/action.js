/**
 * 登录页 Action
 *
 * 通过 action.login(obj) 方法，传入由组件返回的数据，将会与 API 交互
 * 登录成功后直接跳转到店铺选择页面
 * 接口返回错误、网络请求错误将会走到失败流程
 */

import {LOGIN_FAILURE} from './constants';
import {globalLoading, globalLoadingHide, globalMessageError} from '../App/action';
import api from './api';
import {hashHistory} from 'react-router';

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
