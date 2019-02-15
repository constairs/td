import { combineReducers } from 'redux';
import { cardsReducer } from './cards/reducer';
import { userReducer } from './users/reducer';

export const rootReducer = combineReducers({ userReducer, cardsReducer });
