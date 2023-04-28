import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

function IncomeList({ incomeList, totalIncome }) {
  const [userIncome, setUserIncome] = useState(null);
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
        setUserIncome(
          docSnap
            .data()
            .income.amount.reduce(
              (item1, item2) => Number(item1) + Number(item2),
              0
            )
        );
      } else {
        console.log('No such document!');
      }
    };

    if (currentUser.currentUser) {
      getUserData();
    }
  }, [currentUser]);

  return (
    <ul>
      {incomeList.map((item, index) => (
        <li key={index}>{item + '$'}</li>
      ))}
      {userIncome && <p>Your income: {userIncome}</p>}
      <p>Your total income: {totalIncome}</p>
    </ul>
  );
}

export default IncomeList;
