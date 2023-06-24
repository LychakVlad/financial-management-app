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

const MainStats = () => {
  const [loading, setLoading] = useState(false);
  const { totalExpense, expenses } = useSelector((state) => state.expenses);
  const totalTax = useSelector((state) => state.taxes.totalTaxLiability);
  const { totalIncome, totalCard, totalCash } = useSelector(
    (state) => state.incomes
  );

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

  const totalSavings = expenses
    .filter((item) => item.type === 'Savings')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  const totalAfterTax = Math.round(totalIncome - totalTax);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Your Financial Summary</h2>
      <div className={styles.summary}>
        <div>
          {' '}
          <p>Your total savings: {formatNumber(totalSavings) + ' $'}</p>
          <p>Money in cash: {formatNumber(totalCash) + ' $'}</p>
          <p>Money on Card: {formatNumber(totalCard) + ' $'}</p>
          <p>Your total expenses: {formatNumber(totalExpense) + ' $'}</p>
        </div>

        <div>
          <p>
            Your total income before tax: {formatNumber(totalIncome) + ' $'}
          </p>
          <p>You need to pay: {formatNumber(totalTax) + ' $'}</p>
          <p>
            Your total income after tax: {formatNumber(totalAfterTax) + ' $'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainStats;
