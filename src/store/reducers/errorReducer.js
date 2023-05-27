import { SET_EMAIL_ERROR, SET_PASSWORD_ERROR } from '../actions/errorActions';

const defaultState = {
  email: false,
  password: false,
};

export const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_EMAIL_ERROR:
      return {
        ...state,
        email: action.payload,
      };
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};
