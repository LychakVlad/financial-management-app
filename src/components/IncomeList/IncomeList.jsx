import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { removeIncomeAction } from '../../store/actions/incomeActions';

function IncomeList({
  typeList,
  setTypeList,
  incomeList,
  setIncomeList,
  dateList,
  setDateList,
}) {
  const incomes = useSelector((state) => state.incomes.incomes);
  const dispatch = useDispatch();

  console.log(incomes);

  const totalIncome = useMemo(() => {
    return incomes.reduce((n, { amount }) => n + Number(amount), 0);
  }, [incomes]);

  const removeIncome = (income) => {
    dispatch(removeIncomeAction(income.id));
  };
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
      {incomes.length > 0 ? (
        <div>
          {incomes.map((income) => (
            <>
              <div>{income.amount}</div> <div>{income.type}</div>
              <div>{income.date}</div>
              <button onClick={() => removeIncome(income)}>Delete</button>
            </>
          ))}
        </div>
      ) : (
        <div>No income yet...</div>
      )}

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
