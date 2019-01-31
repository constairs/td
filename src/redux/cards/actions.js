import {
  CREATE_CARD_REQUEST,
  CREATE_CARD_SUCCESS,
  CREATE_CARD_FAIL
} from './types';

export const createCardRequest = card => ({ type: CREATE_CARD_REQUEST, fetching: true, card });
export const createCardSuccess = () => ({ type: CREATE_CARD_SUCCESS, fetching: false });
export const createCardFail = error => ({ type: CREATE_CARD_FAIL, fetching: false, error });
