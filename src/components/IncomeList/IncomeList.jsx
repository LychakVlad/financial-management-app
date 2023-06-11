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
import CustomButton from '../form/Button/CustomButton';
import styles from './IncomeList.module.css';

function IncomeList() {
  const incomes = useSelector((state) => state.incomes.incomes || []);
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const dispatch = useDispatch();

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
    <ul className={styles.list}>
      {incomes.length > 0 ? (
        <div className={styles.listWrapper}>
          {incomes.map((income) => (
            <div key={income.id} className={styles.item}>
              <div className={styles.income}>+{income.amount} $</div>
              <div>{income.type}</div>
              <div>{income.date}</div>
              <CustomButton
                type="submit"
                title="Delete"
                onClick={() => deletePoint(income)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No income yet...</div>
      )}
      <div className={styles.total}>
        <p>Your total income: {totalIncome} $</p>
        <CustomButton type="submit" title="Delete all" onClick={deleteAll} />
      </div>
    </ul>
  );
}

export default IncomeList;
