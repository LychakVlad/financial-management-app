import React from 'react';
import Header from '../components/Header/Header';
import HomePage from '../components/HomePage/HomePage';
import ExpenseTracker from '../components/ExpenseTracker/ExpenseTracker';
import IncomeCounter from '../components/IncomeCounter/IncomeCounter';
import TaxCalculator from '../components/TaxCalculator/TaxCalculator';

const MainPage = () => {
  return (
    <>
      <Header />
      <HomePage />
      <ExpenseTracker />
      <IncomeCounter />
      <TaxCalculator />
    </>
  );
};

export default MainPage;
