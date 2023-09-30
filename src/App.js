import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import { Routes, Route, HashRouter, Router } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './pages/PrivateRoute';
import './index.css';
import TaxCalculator from './components/Tax/TaxCalculator/TaxCalculator';
import IncomeCounter from './components/Income/IncomeCounter/IncomeCounter';
import BudgetPlanner from './components/Budget/BudgetPlanner/BudgetPlanner';
import ExpenseTracker from './components/Expense/ExpenseTracker/ExpenseTracker';
import MainStats from './components/Stats/MainStats/MainStats';

function App() {
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
    <HashRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <PrivateRoute>
              <MainPage>
                <MainStats />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          index
          path="/income-tracker"
          element={
            <PrivateRoute>
              <MainPage>
                <IncomeCounter />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/tax-calculator"
          element={
            <PrivateRoute>
              <MainPage>
                <TaxCalculator />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/expense-tracker"
          element={
            <PrivateRoute>
              <MainPage>
                <ExpenseTracker />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/budget-planner"
          element={
            <PrivateRoute>
              <MainPage>
                <BudgetPlanner />
              </MainPage>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
