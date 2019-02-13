import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL
} from './types';

export const userLoginRequest = credentials => ({ type: USER_LOGIN_REQUEST, payload: credentials });
export const userLoginSuccess = response => ({ type: USER_LOGIN_SUCCESS, response });
export const userLoginFail = error => ({ type: USER_LOGIN_FAIL, error });

export const userLogoutRequest = () => ({ type: USER_LOGOUT_REQUEST });
export const userLogoutSuccess = response => ({ type: USER_LOGOUT_SUCCESS, response });
export const userLogoutFail = error => ({ type: USER_LOGOUT_FAIL, error });
