import React, { useEffect, useState } from 'react';
import styles from './MainStats.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import {
  updateCardAction,
  updateCashAction,
  updateIncomeAction,
  updateSavingsAction,
} from '../../../store/actions/incomeActions';
import { doc, getDoc } from 'firebase/firestore';
import { formatNumber } from '../../../utils/formatNumber';
import { setTotalTaxLiabilityAction } from '../../../store/actions/taxActions';
import MoneyStats from '../MoneyStats/MoneyStats';
import ExpenseStats from '../ExpenseStats/ExpenseStats';
import { Link } from 'react-router-dom';
import { updateExpenseAction } from '../../../store/actions/expenseActions';

const MainStats = () => {
  const [loading, setLoading] = useState(false);
  const totalTax = useSelector((state) => state.taxes.totalTaxLiability);
  const { totalIncome, totalCard, totalCash, totalSavings } = useSelector(
    (state) => state.incomes
  );

  const dispatch = useDispatch();

  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        setLoading(false);
        dispatch(updateIncomeAction(userData?.incomes || []));

        dispatch(setTotalTaxLiabilityAction(userData?.totalTax || 0));
        dispatch(updateExpenseAction(userData?.expenses || []));

        dispatch(updateCashAction(userData?.money.totalCash));
        dispatch(updateCardAction(userData?.money.totalCard));
        dispatch(updateSavingsAction(userData?.money.totalSavings));
      };

      fetchData();
    }
  }, [currentUser, dispatch, totalCard, totalCash, totalSavings]);

  const totalAfterTax = Math.round(totalIncome - totalTax);

  return (
    <section className={styles.section}>
      <div className={styles.money}>
        <h2 className={styles.title}>Your Financial Summary</h2>
        <MoneyStats />
      </div>
      <div className={styles.expense}>
        <ExpenseStats />
      </div>
      <div className={styles.income}>
        <p>
          Your total income before tax:
          <span className={styles.number}>
            {' ' + formatNumber(totalIncome) + ' $'}
          </span>
        </p>
        <p>
          You need to pay:
          <span className={styles.numberTax}>
            {' ' + (totalIncome > 0 ? formatNumber(totalTax) : 0) + ' $'}
          </span>
          <span className={styles.taxLink}>
            <Link to="/tax-calculator">Calculate</Link>
          </span>
        </p>
        <p>
          Your total income after tax:
          <span className={styles.number}>
            {' ' + (totalIncome > 0 ? formatNumber(totalAfterTax) : 0) + ' $'}
          </span>
        </p>
      </div>
    </section>
  );
};

export default MainStats;
