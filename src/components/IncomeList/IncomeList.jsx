import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

function IncomeList({
  typeList,
  setTypeList,
  incomeList,
  setIncomeList,
  totalIncome,
  dateList,
  setDateList,
}) {
  const currentUser = useAuth();

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, 'users');

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUser();
  }, []);

  useEffect(() => {
    if (currentUser?.currentUser) {
      const userDocRef = firestore
        .collection('users')
        .doc(currentUser.currentUser.uid);
      const getUserData = async () => {
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        setIncomeList(userData.income.amount);
        setTypeList(userData.income.type);
      };
      getUserData();
    }
  }, [currentUser]);

  const deleteAll = async () => {
    await deleteDoc(
      doc(firestore, 'users', currentUser?.currentUser._delegate.uid),
      {
        income: {
          amount: null,
          type: null,
          date: null,
        },
      }
    );
    setIncomeList([]);
    setTypeList([]);
    setDateList([]);
  };

  const deletePoint = async (index) => {
    const updatedAmount = incomeList.filter((income, i) => i !== index);
    const updatedType = typeList.filter((type, i) => i !== index);
    const updatedDate = dateList.filter((type, i) => i !== index);

    await firestore
      .collection('users')
      .doc(currentUser.currentUser.uid)
      .update({
        income: {
          amount: updatedAmount,
          type: updatedType,
          date: updatedDate,
        },
      });

    setIncomeList(updatedAmount);
    setTypeList(updatedType);
    setDateList(updatedDate);
  };

  return (
    <ul>
      {incomeList?.map((income, index) => (
        <li key={index}>
          {income}${typeList[index]}
          {dateList[index]}
          <button onClick={() => deletePoint(index)}>Delete this</button>
        </li>
      ))}

      <p>Your total income: {totalIncome}</p>
      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
    </ul>
  );
}

export default IncomeList;
