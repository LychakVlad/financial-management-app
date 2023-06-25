import React, { useEffect, useState } from 'react';
import styles from './MainStats.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { updateExpenseAction } from '../../../store/actions/expenseActions';
import {
  updateCardAction,
  updateCashAction,
  updateIncomeAction,
} from '../../../store/actions/incomeActions';
import { formatNumber } from '../../../utils/formatNumber';
import { setTotalTaxLiabilityAction } from '../../../store/actions/taxActions';
import MoneyStats from '../MoneyStats/MoneyStats';
import ExpenseStats from '../ExpenseStats/ExpenseStats';

const MainStats = () => {
  const [loading, setLoading] = useState(false);
  const totalTax = useSelector((state) => state.taxes.totalTaxLiability);
  const { totalIncome } = useSelector((state) => state.incomes);

  const dispatch = useDispatch();

  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = firestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        setLoading(false);
        dispatch(updateExpenseAction(userData?.expenses || []));
        dispatch(updateIncomeAction(userData?.incomes || []));
        dispatch(setTotalTaxLiabilityAction(userData?.totalTax || 0));

        dispatch(updateCashAction(userData?.money.totalCash));
        dispatch(updateCardAction(userData?.money.totalCard));
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const totalAfterTax = Math.round(totalIncome - totalTax);

  return (
    <section className={styles.section}>
      <div className={styles.money}>
        <h2 className={styles.title}>Your Financial Summary</h2>
        <MoneyStats />
      </div>
      <div className={styles.expense}>
        {' '}
        <ExpenseStats />
      </div>
      <div className={styles.income}>
        <p>Your total income before tax: {formatNumber(totalIncome) + ' $'}</p>
        <p>You need to pay: {formatNumber(totalTax) + ' $'}</p>
        <p>Your total income after tax: {formatNumber(totalAfterTax) + ' $'}</p>
      </div>
    </section>
  );
};

export default MainStats;
