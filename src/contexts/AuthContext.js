import React, { useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(name, email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return cred.user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          return firestore
            .collection('users')
            .doc(cred.user.uid)
            .set({
              incomes: {},
              expenses: {},
              budget: {
                needs: null,
                wants: null,
                savings: null,
              },
            });
        });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(() => {});
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
    return;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
