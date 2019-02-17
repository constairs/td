import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  // USER_ACTION_FAIL
} from './types';

export const userLoginRequest = credentials => ({ type: USER_LOGIN_REQUEST, payload: credentials });
export const userLoginSuccess = response => ({ type: USER_LOGIN_SUCCESS, response });
export const userLoginFail = error => ({ type: USER_LOGIN_FAIL, error });

export const userLogoutRequest = profileData => ({
  type: USER_LOGOUT_REQUEST,
  payload: profileData
});
export const userLogoutSuccess = response => ({ type: USER_LOGOUT_SUCCESS, response });
export const userLogoutFail = error => ({ type: USER_LOGOUT_FAIL, error });

export const userUpdateRequest = () => ({ type: USER_UPDATE_REQUEST });
export const userUpdateSuccess = response => ({ type: USER_UPDATE_SUCCESS, response });
export const userUpdateFail = error => ({ type: USER_UPDATE_FAIL, error });
