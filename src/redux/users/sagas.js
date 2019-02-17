import { call, put, takeEvery } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_UPDATE_REQUEST
} from './types';
import {
  userLoginSuccess,
  userLoginFail,
  userLogoutSuccess,
  userLogoutFail,
  userUpdateSuccess,
  userUpdateFail
} from './actions';
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '../../firebase/userFunctions';

export function* userLoginSaga({ payload: { email, password } }) {
  try {
    const response = yield call(signInWithEmailAndPassword, email, password);
    yield put(userLoginSuccess(response));
  } catch (error) {
    yield put(userLoginFail(error.message));
  }
}

export function* userLogoutSaga() {
  try {
    const response = yield call(signOut);
    yield put(userLogoutSuccess(response));
  } catch (error) {
    yield put(userLogoutFail(error.message));
  }
}

export function* userUpdateSaga({ payload: { userName, userImg } }) {
  try {
    const response = yield call(updateProfile, userName, userImg);
    yield put(userUpdateSuccess(response));
  } catch (error) {
    yield put(userUpdateFail(error.message));
  }
}

export function* userSagas() {
  yield takeEvery(USER_LOGIN_REQUEST, userLoginSaga);
  yield takeEvery(USER_LOGOUT_REQUEST, userLogoutSaga);
  yield takeEvery(USER_UPDATE_REQUEST, userUpdateSaga);
}
