import { ADD_NEEDS, ADD_SAVINGS, ADD_WANTS } from "../actions/budgetActions";

const wantsList = [
  { key: "entertainmentExpense", label: "Entertainment" },
  { key: "diningOutExpense", label: "Dining Out" },
  { key: "shoppingExpense", label: "Shopping" },
  { key: "travelExpense", label: "Travel" },
  { key: "gymMembershipExpense", label: "Gym Membership" },
];

const needsList = [
  { key: "rentExpense", label: "Rent/Mortgage" },
  { key: "gasolineExpense", label: "Gasoline" },
  { key: "carPaymentExpense", label: "Car Payment" },
  { key: "electricityExpense", label: "Electricity and Gas" },
  { key: "waterExpense", label: "Water Bill" },
  { key: "healthInsuranceExpense", label: "Health Insurance" },
  { key: "groceriesExpense", label: "Groceries" },
  { key: "studentLoanExpense", label: "Student Loan" },
  { key: "phoneAndInternetExpense", label: "Phone and Internet" },
];

const savingsList = [
  { key: "emergencySavings", label: "Emergency Savings" },
  { key: "retirementSavings", label: "Retirement Savings" },
  { key: "vacationSavings", label: "Vacation Savings" },
  { key: "educationSavings", label: "Education Savings" },
  { key: "houseSavings", label: "House Savings" },
];

const initialState = {
  needs: needsList.map((category) => ({
    category: category.label,
    key: category.key,
    value: null,
  })),
  wants: wantsList.map((category) => ({
    category: category.label,
    key: category.key,
    value: null,
  })),
  savings: savingsList.map((category) => ({
    category: category.label,
    key: category.key,
    value: null,
  })),
  totalWants: 0,
  totalNeeds: 0,
  totalSavings: 0,
};

export const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEEDS:
      const { category, value } = action.payload;
      const updatedNeeds = state.needs.map((need) =>
        need.category === category ? { ...need, value } : need,
      );
      const newNeeds = updatedNeeds.some((need) => need.category === category)
        ? updatedNeeds
        : [...updatedNeeds, { category, value }];
      return {
        ...state,
        needs: newNeeds,
        totalNeeds: newNeeds.reduce((total, need) => total + need.value, 0),
      };

    case ADD_WANTS:
      const { category: wantCategory, value: wantValue } = action.payload;
      const updatedWants = state.wants.map((want) =>
        want.category === wantCategory ? { ...want, value: wantValue } : want,
      );
      const newWants = updatedWants.some(
        (want) => want.category === wantCategory,
      )
        ? updatedWants
        : [...updatedWants, { category: wantCategory, value: wantValue }];
      return {
        ...state,
        wants: newWants,
        totalWants: newWants.reduce((total, want) => total + want.value, 0),
      };

    case ADD_SAVINGS:
      const { category: savingCategory, value: savingValue } = action.payload;
      const updatedSavings = state.savings.map((saving) =>
        saving.category === savingCategory
          ? { ...saving, value: savingValue }
          : saving,
      );
      const newSavings = updatedSavings.some(
        (saving) => saving.category === savingCategory,
      )
        ? updatedSavings
        : [...updatedSavings, { category: savingCategory, value: savingValue }];
      return {
        ...state,
        savings: newSavings,
        totalSavings: newSavings.reduce(
          (total, saving) => total + saving.value,
          0,
        ),
      };

    default:
      return state;
  }
};
