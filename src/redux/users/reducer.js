import * as TYPES from './types';

const initState = {
  user: null,
  fetching: false,
  error: null
};

const userLoginRequest = (state = initState) => ({
  ...state,
  fetching: true,
});

const userLoginSuccess = (state, payload) => ({
  ...state,
  fetching: false,
  user: { ...state.user, payload }
});

const userLoginFail = (state, error) => ({
  ...state,
  fetching: false,
  error
});

export const cardsReducer = (type, action) => {
  // {
  //   'CREATE_CARD_REQUEST': createCardRequest(state, action.payload),
  //   'CREATE_CARD_SUCCESS': createCardSuccess(state, action.payload),
  //   'CREATE_CARD_FAIL': createCardFail(state, action.payload)
  // }[type]
};
