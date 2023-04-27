import HomePage from './components/HomePage/HomePage';
import TaxCalculator from './components/TaxCalculator/TaxCalculator';
import styles from './App.module.css';
import IncomeCounter from './components/IncomeCounter/IncomeCounter';
import { useCallback, useState, useMemo } from 'react';
import Header from './components/Header/Header';
import AuthProvider from './contexts/AuthContext';

function App() {
  const [income, setIncome] = useState('');
  const [incomeList, setIncomeList] = useState([]);

  const handleAddIncome = useCallback(() => {
    setIncomeList([...incomeList, income]);
    setIncome('');
  }, [incomeList, income]);

  const totalIncome = useMemo(() => {
    return incomeList.reduce((acc, item) => acc + parseFloat(item), 0);
  }, [incomeList]);

  return (
    <AuthProvider>
      <div className={styles.container}>
        <Header />
        <HomePage />
        <IncomeCounter
          income={income}
          setIncome={setIncome}
          handleAddIncome={handleAddIncome}
          incomeList={incomeList}
          totalIncome={totalIncome}
        />
        <TaxCalculator totalIncome={totalIncome} />
      </div>
    </AuthProvider>
  );
}

export default App;
