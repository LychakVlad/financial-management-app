import React, { useState } from 'react';
import styles from './MoneyStats.module.css';
import { formatNumber } from '../../../utils/formatNumber';
import { useSelector } from 'react-redux';
import CustomButton from '../../form/Button/CustomButton';
import Modal from '../../ui/Modal/Modal';
import TransferStats from '../TransferStats/TransferStats';

const MoneyStats = () => {
  const [openModal, setOpenModal] = useState(false);
  const { totalCard, totalCash, totalSavings } = useSelector(
    (state) => state.incomes
  );

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
          <TransferStats handleClick={setOpenModal} />
        </Modal>
      )}
    </div>
  );
};

export default MoneyStats;
