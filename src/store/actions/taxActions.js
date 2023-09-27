export const SET_FILING_STATUS = "SET_FILING_STATUS";
export const SET_DEDUCTIONS = "SET_DEDUCTIONS";
export const SET_TOTAL_TAX_LIABILITY = "SET_TOTAL_TAX_LIABILITY";
export const SET_STATE_TAX = "SET_STATE_TAX";
export const SET_FEDERAL_TAX = "SET_FEDERAL_TAX";

export const setFilingStatusAction = (status) => ({
  type: SET_FILING_STATUS,
  payload: status,
});

export const setDeductionsAction = (deductions) => ({
  type: SET_DEDUCTIONS,
  payload: deductions,
});

export const setTotalTaxLiabilityAction = (taxLiability) => ({
  type: SET_TOTAL_TAX_LIABILITY,
  payload: taxLiability,
});

export const setStateTaxAction = (stateTax) => ({
  type: SET_STATE_TAX,
  payload: stateTax,
});

export const setFederalTaxAction = (federalTax) => ({
  type: SET_FEDERAL_TAX,
  payload: federalTax,
});
