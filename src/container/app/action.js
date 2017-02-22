/**
 * App Actions
 *
 * 位于 `/src/container/App` 下的 action 是相对于全局使用，集成错误提示、弹窗等。
 */

import {
  GLOBAL_MESSAGE_ERROR,
  GLOBAL_MESSAGE_SUCCESS,
  GLOBAL_LOADING,
  GLOBAL_LOADING_HIDE
} from './constants';

export const globalMessageError = (message) => ({
  type: GLOBAL_MESSAGE_ERROR,
  message
});

export const globalMessageSuccess = (message) => ({
  type: GLOBAL_MESSAGE_SUCCESS,
  message
});

export const globalLoading = () => ({
  type: GLOBAL_LOADING
});
export const globalLoadingHide = () => ({
  type: GLOBAL_LOADING_HIDE
});
