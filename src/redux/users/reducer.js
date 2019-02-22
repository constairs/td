import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from './types';

const initState = {
  user: null,
  fetching: false,
  error: null
};

export const userReducer = (state = initState, action) => {
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
        user: {
          ...state.user,
          payload: action.payload
        }
      });

    case USER_LOGIN_FAIL:
      return ({
        ...state,
        fetching: false,
        error: action.error
      });

    case USER_UPDATE_REQUEST:
      return ({
        ...state,
        fetching: true
      });

    case USER_UPDATE_SUCCESS:
      return ({
        ...state,
        fetching: false,
        user: {
          ...state.user,
          payload: action.payload
        }
      });

    case USER_UPDATE_FAIL:
      return ({
        ...state,
        fetching: false,
        error: action.error
      });

    default:
      return initState;
  }
};

