import HomePage from './components/HomePage/HomePage';
import TaxCalculator from './components/TaxCalculator/TaxCalculator';
import styles from './App.module.css';
import IncomeCounter from './components/IncomeCounter/IncomeCounter';
import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';

function App() {
  const [income, setIncome] = useState('');
  const [incomeList, setIncomeList] = useState([]);
  const [type, setType] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [date, setDate] = useState('');
  const [dateList, setDateList] = useState([]);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(firestore, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <Login />
      <HomePage />
      <IncomeCounter
        income={income}
        setIncome={setIncome}
        type={type}
        setType={setType}
        typeList={typeList}
        setTypeList={setTypeList}
        setIncomeList={setIncomeList}
        incomeList={incomeList}
        date={date}
        setDate={setDate}
        dateList={dateList}
        setDateList={setDateList}
      />
      <TaxCalculator />
    </div>
  );
}

export default App;
