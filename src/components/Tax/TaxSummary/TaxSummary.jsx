import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaxSummary.module.css';
import { updateIncomeAction } from '../../../store/actions/incomeActions';
import { firestore } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { formatNumber } from '../../../utils/formatNumber';
import { doc, getDoc } from 'firebase/firestore';

function TaxSummary() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const { stateTax, federalTax, totalTaxLiability } = useSelector(
    (state) => state.taxes
  );
  const [loading, setLoading] = useState(false);
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
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const incomeBeforeTax = incomes.reduce((accumulator, item) => {
    if (item.tax === 'Taxable') {
      return accumulator + parseFloat(item.amount);
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <div className={styles.form}>
      <p>
        State tax:{' '}
        <span className={styles.tax} data-testid="state-tax-test">
          {stateTax}%
        </span>
      </p>
      <p>
        Federal tax:{' '}
        <span className={styles.tax} data-testid="federal-tax-test">
          {federalTax}%
        </span>
      </p>
      <p>
        FICA tax: <span className={styles.tax}> 7.65%</span>
      </p>

      <p>
        Your income before taxes:{' '}
        <span className={styles.income} data-testid="total-tax-test">
          {loading ? (
            <span>Loading...</span>
          ) : (
            `${formatNumber(incomeBeforeTax)} $`
          )}
        </span>
      </p>
      <p>
        You need to pay:{' '}
        <span className={styles.totalTax} data-testid="total-pay-test">
          {formatNumber(Math.round(totalTaxLiability))} $
        </span>
      </p>
    </div>
  );
}

export default TaxSummary;
