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
}) {
  const currentUser = useAuth();

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const deleteAll = async () => {
    await deleteDoc(
      doc(firestore, 'users', currentUser?.currentUser._delegate.uid),
      {
        income: {
          amount: null,
          type: null,
        },
      }
    );
    setIncomeList([]);
    setTypeList([]);
  };

  return (
    <ul>
      {incomeList?.map((income, index) => (
        <li key={index}>
          {income}${typeList[index]}
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
