import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { firestore } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeIncomeAction,
  updateIncomeAction,
} from '../../store/actions/incomeActions';

function IncomeList() {
  const incomes = useSelector((state) => state.incomes.incomes || []);
  const dispatch = useDispatch();

  const totalIncome = incomes.reduce((n, { amount }) => n + Number(amount), 0);

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
      const fetchData = async () => {
        const userId = currentUser.currentUser.uid;
        const userDocRef = firestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        dispatch(updateIncomeAction(userData?.incomes || []));
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const deleteAll = async () => {
    await deleteDoc(
      doc(firestore, 'users', currentUser?.currentUser?._delegate?.uid),
      {
        incomes: [],
      }
    );
    dispatch(updateIncomeAction([]));
  };

  const deletePoint = async (income) => {
    const userId = currentUser?.currentUser?.uid;

    await firestore
      .collection('users')
      .doc(userId)
      .update({
        incomes: firebase.firestore.FieldValue.arrayRemove(income),
      });

    dispatch(removeIncomeAction(income.id));
  };

  return (
    <ul>
      {incomes.length > 0 ? (
        <div>
          {incomes.map((income) => (
            <div key={income.id}>
              <div>{income.amount}</div>
              <div>{income.type}</div>
              <div>{income.date}</div>
              <button onClick={() => deletePoint(income)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No income yet...</div>
      )}

      <p>Your total income: {totalIncome}</p>
      <button onClick={deleteAll}>Delete all</button>
    </ul>
  );
}

export default IncomeList;
