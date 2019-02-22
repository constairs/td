import * as TYPES from './types';

const initState = {
  fetching: false,
  error: null
};

export const cardsReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.CREATE_CARD_REQUEST:
      return ({
        ...state,
        fetching: true,
      });

    case TYPES.CREATE_CARD_SUCCESS:
      return ({
        ...state,
        cards: [...state.cards, ...action.payload],
        fetching: false
      });

    case TYPES.CREATE_CARD_FAIL:
      return ({
        ...state,
        error: action.payload,
        fetching: false
      });

    default:
      return initState;
  }
};
