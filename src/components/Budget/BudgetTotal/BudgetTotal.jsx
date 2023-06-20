import React, { useEffect, useState } from 'react';
import styles from './BudgetTotal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../firebase';
import { updateIncomeAction } from '../../../store/actions/incomeActions';
import { setTotalTaxLiabilityAction } from '../../../store/actions/taxActions';

const BudgetTotal = () => {
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = firestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        dispatch(setTotalTaxLiabilityAction(userData?.totalTax || 0));
        dispatch(updateIncomeAction(userData?.incomes || []));
        setLoading(false);
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const totalAfterTax = Math.round(totalIncome - totalTax);

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.title}>Your totals:</h2>
        <ul className={styles.list}>
          <li className={styles.point}>
            Needs: <span className={styles.number}>{totalNeeds} $</span>
          </li>

          <li className={styles.point}>
            Wants: <span className={styles.number}>{totalWants} $</span>
          </li>
          <li className={styles.point}>
            Savings and debt repayment:{' '}
            <span className={styles.number}>{totalSavings} $</span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className={styles.title}>50/30/20 comparison:</h2>
        <ul className={styles.list}>
          {' '}
          <li className={styles.point}>
            Your total income after tax:{' '}
            <span className={styles.number}>{totalAfterTax} $</span>
          </li>
          <li className={styles.point}>
            50% for necessities:
            <span className={styles.number}>
              {' '}
              {Math.round(totalAfterTax / 100) * 50} $
            </span>
          </li>
          <li className={styles.point}>
            30% for wants:
            <span className={styles.number}>
              {' '}
              {Math.round(totalAfterTax / 100) * 30} $
            </span>
          </li>
          <li className={styles.point}>
            20% for savings and debt repayment:{' '}
            <span className={styles.number}>
              {' '}
              {Math.round(totalAfterTax / 100) * 20} $
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetTotal;
