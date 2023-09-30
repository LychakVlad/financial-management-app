import React, { useEffect, useState } from 'react';
import styles from './BudgetTotal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../firebase';
import { updateIncomeAction } from '../../../store/actions/incomeActions';
import { setTotalTaxLiabilityAction } from '../../../store/actions/taxActions';
import { formatNumber } from '../../../utils/formatNumber';
import { doc, getDoc } from 'firebase/firestore';

const BudgetTotal = () => {
  const [loading, setLoading] = useState(true);
  const { totalWants, totalSavings, totalNeeds } = useSelector(
    (state) => state.budget
  );
  const totalTax = useSelector((state) => state.taxes.totalTaxLiability);
  const totalIncome = useSelector((state) => state.incomes.totalIncome);
  const currentUser = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        const userId = currentUser.currentUser.uid;
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        setLoading(false);
        dispatch(setTotalTaxLiabilityAction(userData?.totalTax || 0));
        dispatch(updateIncomeAction(userData?.incomes || []));
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const totalAfterTax = Math.round(totalIncome - totalTax);
  const fiftyPercent = loading
    ? 'Loading...'
    : formatNumber(Math.round(totalAfterTax / 100) * 50) + '$';
  const thirtyPercent = loading
    ? 'Loading...'
    : formatNumber(Math.round(totalAfterTax / 100) * 30) + '$';
  const twentyPercent = loading
    ? 'Loading...'
    : formatNumber(Math.round(totalAfterTax / 100) * 20) + '$';

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.title}>Your totals:</h2>
        <ul className={styles.list}>
          <li className={styles.point}>
            Needs:{' '}
            <span className={styles.number} data-testid="total-needs">
              {formatNumber(totalNeeds)} $
            </span>
          </li>
          <li className={styles.point}>
            Wants:{' '}
            <span className={styles.number} data-testid="total-wants">
              {formatNumber(totalWants)} $
            </span>
          </li>
          <li className={styles.point}>
            Savings and debt repayment:{' '}
            <span className={styles.number} data-testid="total-savings">
              {formatNumber(totalSavings)} $
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className={styles.title}>50/30/20 comparison:</h2>
        <ul className={styles.list}>
          <li className={styles.point}>
            Your total income after tax:{' '}
            <span className={styles.number} data-testid="total-after-tax">
              {formatNumber(totalAfterTax)} $
            </span>
          </li>

          <li className={styles.point}>
            50% for necessities:{' '}
            <span className={styles.number} data-testid="total-needs-after-tax">
              {fiftyPercent}{' '}
            </span>
          </li>
          <li className={styles.point}>
            30% for wants:{' '}
            <span className={styles.number} data-testid="total-wants-after-tax">
              {thirtyPercent}{' '}
            </span>
          </li>
          <li className={styles.point}>
            20% for savings and debt repayment:{' '}
            <span
              className={styles.number}
              data-testid="total-savings-after-tax"
            >
              {twentyPercent}{' '}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetTotal;
