import { UPDATE_EMAIL_ERROR } from '../actions/errorActions';

const defaultState = {
  email: false,
};

export const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL_ERROR:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};
