import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from './types';

export const userLoginRequest = credentials => ({ type: USER_LOGIN_REQUEST, payload: credentials });
export const userLoginSuccess = response => ({ type: USER_LOGIN_SUCCESS, response });
export const userLoginFail = error => ({ type: USER_LOGIN_FAIL, error });
