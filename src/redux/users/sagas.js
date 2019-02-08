import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_LOGIN_REQUEST } from './types';
import { userLoginSuccess, userLoginFail } from './actions';
import { signInWithEmailAndPassword } from '../../firebase/userFunctions';

export function* userLoginSaga({ payload: { email, password } }) {
  try {
    const response = yield call(signInWithEmailAndPassword, email, password);
    yield put(userLoginSuccess(response));
  } catch (error) {
    yield put(userLoginFail(error.message));
  }
}

export function* userSagas() {
  yield takeEvery(USER_LOGIN_REQUEST, userLoginSaga);
}
