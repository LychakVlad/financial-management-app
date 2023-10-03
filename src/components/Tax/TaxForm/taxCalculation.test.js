import { calculateTaxLiability } from './taxCalculation'; // Replace with the actual path
import { virginiaTaxRates, federalTaxRates } from '../../../data/taxRates';

const mockDispatch = jest.fn();

describe('calculateTaxLiability', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('calculates tax liability correctly for a single status', () => {
    const deductions = 1000;
    const filingStatus = 'single';
    const totalIncome = 50000;

    const result = calculateTaxLiability(
      deductions,
      filingStatus,
      totalIncome,
      virginiaTaxRates,
      federalTaxRates,
      mockDispatch
    );

    expect(result).toBe('11946.00');
  });

  it('calculates tax liability correctly for a 0', () => {
    const deductions = 0;
    const filingStatus = 'single';
    const totalIncome = 0;

    const result = calculateTaxLiability(
      deductions,
      filingStatus,
      totalIncome,
      virginiaTaxRates,
      federalTaxRates,
      mockDispatch
    );

    expect(result).toBe('0.00');
  });

  it('calculates tax liability correctly for a married status', () => {
    const deductions = 1000;
    const filingStatus = 'married';
    const totalIncome = 75000;

    const result = calculateTaxLiability(
      deductions,
      filingStatus,
      totalIncome,
      virginiaTaxRates,
      federalTaxRates,
      mockDispatch
    );

    expect(result).toBe('18157.00');
  });
});
