import { SET_TAB } from "../actions/tabsActions";

const initialState = {
  currentTab: "needs",
};

export const tabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      return { ...state, currentTab: action.payload };
    default:
      return state;
  }
};
