import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

function IncomeList({ incomeList, setIncomeList, totalIncome }) {
  const currentUser = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(
        firestore,
        'users',
        currentUser.currentUser._delegate.uid
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setIncomeList(docSnap.data().income.amount);
      } else {
        console.log('No such document!');
      }
    };

    if (currentUser.currentUser) {
      getUserData();
    }
  }, [currentUser, setIncomeList]);

  return (
    <ul>
      {incomeList?.map((item, index) => (
        <li key={index}>{item + '$'}</li>
      ))}
      <p>Your total income: {totalIncome}</p>
    </ul>
  );
}

export default IncomeList;
