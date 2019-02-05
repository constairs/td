import { call, put, take } from 'redux-saga/effects';

import { createCardSuccess, createCardFail } from './actions';
import { CREATE_CARD_REQUEST } from './types';

const createCard = () => (1);

function* createCardRequest(payload) {
  try {
    const res = yield call(createCard, payload);
    yield put(createCardSuccess(res));
  } catch (error) {
    put(createCardFail(error.message));
  }
}

export function* cardsSagas() {
  yield take(CREATE_CARD_REQUEST, createCardRequest);
}
