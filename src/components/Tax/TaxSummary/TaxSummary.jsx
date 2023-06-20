import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaxSummary.module.css';
import { updateIncomeAction } from '../../../store/actions/incomeActions';
import { firestore } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';

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
        const userDocRef = firestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        dispatch(updateIncomeAction(userData?.incomes || []));
        setLoading(false);
      };

      fetchData();
    }
  }, [currentUser, dispatch]);

  const incomeBeforeTax = incomes.reduce((accumulator, item) => {
    if (item.type === 'Taxable') {
      return accumulator + parseFloat(item.amount);
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <div className={styles.form}>
      <p>
        State tax: <span className={styles.tax}>{stateTax}%</span>
      </p>
      <p>
        Federal tax: <span className={styles.tax}>{federalTax}%</span>
      </p>
      <p>
        FICA tax: <span className={styles.tax}> 7.65%</span>
      </p>

      <p>
        Your total income:{' '}
        <span className={styles.income}>
          {loading ? <span>Loading...</span> : `${incomeBeforeTax}$`}
        </span>
      </p>
      <p>
        You need to pay:{' '}
        <span className={styles.totalTax}>{totalTaxLiability}$</span>
      </p>
    </div>
  );
}

export default TaxSummary;
