import React, { useEffect, useState } from 'react';
import styles from './MoneyStats.module.css';
import { formatNumber } from '../../../utils/formatNumber';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../form/Button/CustomButton';
import Modal from '../../ui/Modal/Modal';
import TransferStats from '../TransferStats/TransferStats';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const MoneyStats = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { expenses } = useSelector((state) => state.expenses);
  const { totalCard, totalCash } = useSelector((state) => state.incomes);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const totalSavings = expenses
    .filter((item) => item.type === 'Savings')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        await updateDoc(doc(firestore, 'users', currentUser?.uid), {
          money: {
            totalSavings: totalSavings,
          },
        });
      };

      fetchData();
    }
  }, [currentUser, totalSavings, dispatch]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        {' '}
        <p>Your total savings: {formatNumber(totalSavings) + ' $'}</p>
        <p>Money in cash: {formatNumber(totalCash) + ' $'}</p>
        <p>Money on Card: {formatNumber(totalCard) + ' $'}</p>
      </div>{' '}
      <div className={styles.button}>
        <CustomButton title={'Transfer money'} onClick={handleOpenModal} />
      </div>
      {openModal && (
        <Modal handleClose={handleOpenModal}>
          <TransferStats />
        </Modal>
      )}
    </div>
  );
};

export default MoneyStats;
