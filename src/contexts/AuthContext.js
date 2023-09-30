import React, { useContext, useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore'; // Import doc from Firestore
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          console.log(cred.user);
          const userDocRef = doc(firestore, 'users', cred.user.uid);
          return setDoc(userDocRef, {
            incomes: {},
            expenses: {},
            money: {
              totalCard: 0,
              totalCash: 0,
              totalSavings: 0,
              totalMoney: 0,
            },
            totalTax: 0,
            totalExpense: 0,
          });
        });
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(() => {});
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
