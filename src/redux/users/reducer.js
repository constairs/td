import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from './types';

const initState = {
  user: null,
  fetching: false,
  error: null
};

// const userLoginRequest = (state = initState) => ({
//   ...state,
//   fetching: true,
// });

// const userLoginSuccess = (state, payload) => ({
//   ...state,
//   fetching: false,
//   user: { ...state.user, payload }
// });

// const userLoginFail = (state, error) => ({
//   ...state,
//   fetching: false,
//   error
// });

export const cardsReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return ({
        ...state,
        fetching: true,
      });

    case USER_LOGIN_SUCCESS:
      return ({
        ...state,
        fetching: false,
        user: { ...state.user, payload: action.payload }
      });

    case USER_LOGIN_FAIL:
      return ({
        ...state,
        fetching: false,
        error: action.error
      });

    default:
      return initState;
  }
};
