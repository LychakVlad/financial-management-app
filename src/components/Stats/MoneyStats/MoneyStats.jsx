import React, { useState } from 'react';
import styles from './MoneyStats.module.css';
import { formatNumber } from '../../../utils/formatNumber';
import { useSelector } from 'react-redux';
import CustomButton from '../../form/Button/CustomButton';
import Modal from '../../ui/Modal/Modal';

const MoneyStats = () => {
  const [openModal, setOpenModal] = useState(false);
  const { expenses } = useSelector((state) => state.expenses);
  const { totalCard, totalCash } = useSelector((state) => state.incomes);

  const totalSavings = expenses
    .filter((item) => item.type === 'Savings')
    .reduce((total, item) => total + parseFloat(item.amount), 0);

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
      {openModal && <Modal handleClose={handleOpenModal}>Hello</Modal>}
    </div>
  );
};

export default MoneyStats;
