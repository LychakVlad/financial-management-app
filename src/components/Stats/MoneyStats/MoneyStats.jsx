import React, { useState } from 'react';
import styles from './MoneyStats.module.css';
import { formatNumber } from '../../../utils/formatNumber';
import { useSelector } from 'react-redux';
import CustomButton from '../../form/Button/CustomButton';
import Modal from '../../ui/Modal/Modal';
import TransferStats from '../TransferStats/TransferStats';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MoneyStats = () => {
  const [openModal, setOpenModal] = useState(false);
  const { totalCard, totalCash, totalSavings } = useSelector(
    (state) => state.incomes
  );

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: ['On card', 'In cash', 'In savings'],
    datasets: [
      {
        label: 'You have',
        data: [totalCard, totalCash, totalSavings],
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <div className={styles.money}>
          {' '}
          <p>
            Money in cash:{' '}
            <span className={styles.number}>
              {' '}
              {formatNumber(totalCash) + ' $'}
            </span>{' '}
          </p>
          <p>
            Money on Card:{' '}
            <span className={styles.number}>
              {' '}
              {formatNumber(totalCard) + ' $'}
            </span>{' '}
          </p>
          <p>
            Your total savings:{' '}
            <span className={styles.number}>
              {' '}
              {formatNumber(totalSavings) + ' $'}
            </span>{' '}
          </p>
        </div>
        <div className={styles.graph}>
          <Doughnut data={data} options={options} height={1000} width={100} />
        </div>
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
