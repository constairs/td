import * as TYPES from './types';

const initialState = {
  fetching: false,
  error: null
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE_CARD_REQUEST:
      return { ...state, fetching: true };

    case TYPES.CREATE_CARD_SUCCESS:
      return { ...state, fetching: false };

    case TYPES.CREATE_CARD_FAIL:
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
};
