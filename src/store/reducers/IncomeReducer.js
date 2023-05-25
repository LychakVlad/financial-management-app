const defaultState = {
  customers: [],
};

export const incomeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };

    default:
      return state;
  }
};
