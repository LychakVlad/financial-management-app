import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './pages/PrivateRoute';
import './index.css';
import TaxCalculator from './components/TaxCalculator/TaxCalculator';
import IncomeCounter from './components/IncomeCounter/IncomeCounter';
import BudgetPlanner from './components/BudgetPlanner/BudgetPlanner';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';

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
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
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
          index
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
          index
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
          index
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
    </BrowserRouter>
  );
}

export default App;
