import * as TYPES from './types';

const initState = {
  fetching: false,
  error: null
};

const createCardRequest = (state = initState) => ({
  ...state,
  fetching: true,
});

const createCardSuccess = (state, payload) => ({
  ...state,
  fetching: false,
  cards: [...state.cards, payload]
});

const createCardFail = (state, error) => ({
  ...state,
  fetching: false,
  error
});

// export const cardsReducer = (type, action) = {
  // {
  //   'CREATE_CARD_REQUEST': createCardRequest(state, action.payload),
  //   'CREATE_CARD_SUCCESS': createCardSuccess(state, action.payload),
  //   'CREATE_CARD_FAIL': createCardFail(state, action.payload)
  // }[type]
// };
