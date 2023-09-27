import {
  SET_FILING_STATUS,
  SET_DEDUCTIONS,
  SET_TOTAL_TAX_LIABILITY,
  SET_STATE_TAX,
  SET_FEDERAL_TAX,
} from "../actions/taxActions";

const initialState = {
  filingStatus: "",
  deductions: 0,
  totalTaxLiability: 0,
  stateTax: 0,
  federalTax: 0,
};

export const taxReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILING_STATUS:
      return { ...state, filingStatus: action.payload };
    case SET_DEDUCTIONS:
      return { ...state, deductions: action.payload };
    case SET_TOTAL_TAX_LIABILITY:
      return { ...state, totalTaxLiability: action.payload };
    case SET_STATE_TAX:
      return { ...state, stateTax: action.payload };
    case SET_FEDERAL_TAX:
      return { ...state, federalTax: action.payload };
    default:
      return state;
  }
};
