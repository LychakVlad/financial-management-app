import { ADD_NEEDS } from '../actions/budgetActions';

const categoryList = [
  { key: 'rentExpense', label: 'Rent/Mortgage' },
  { key: 'gasolineExpense', label: 'Gasoline' },
  { key: 'carPaymentExpense', label: 'Car Payment' },
  { key: 'electricityExpense', label: 'Electricity and Gas' },
  { key: 'waterExpense', label: 'Water Bill' },
  { key: 'healthInsuranceExpense', label: 'Health Insurance' },
  { key: 'groceriesExpense', label: 'Groceries' },
  { key: 'studentLoanExpense', label: 'Student Loan' },
  { key: 'phoneAndInternetExpense', label: 'Phone and Internet' },
];

const initialState = {
  needs: categoryList.map((category) => ({
    category: category.label,
    key: category.key,
    value: null,
  })),
  wants: [],
  savings: [],
  totalPlan: 0,
};

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEEDS:
      const { category, value } = action.payload;
      const updatedNeeds = state.needs.map((need) =>
        need.category === category ? { ...need, value } : need
      );
      const newNeeds = updatedNeeds.some((need) => need.category === category)
        ? updatedNeeds
        : [...updatedNeeds, { category, value }];
      return {
        ...state,
        needs: newNeeds,
        totalPlan: newNeeds.reduce((total, need) => total + need.value, 0),
      };
    default:
      return state;
  }
};
