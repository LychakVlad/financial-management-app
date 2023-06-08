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
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(firestore, 'users');
  const { currentUser } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <BrowserRouter>
      <div>
        {!currentUser && <Header />}
        <div style={{ display: 'flex' }}>
          {!currentUser && <SideBar />}
          <div style={{ flex: 1 }}>
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
