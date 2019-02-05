import { spawn } from 'redux-saga/effects';
import { cardsSagas } from './cards/sagas';

export function* rootSaga() {
  yield spawn(cardsSagas);
}
