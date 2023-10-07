import React, { useEffect, useRef, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import styles from './DateChange.module.css';
import { formatDate } from '../../../utils/dateFormat';

const DateChange = ({ onChange, value, desc }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const formattedValue = value ? formatDate(value) : 'Choose date';

  return (
    <div>
      {desc ? <div className={styles.desc}>{desc}</div> : ''}
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.container}
      >
        <p
          onClick={() => setDropdown((prev) => !prev)}
          className={styles.selectedValue}
        >
          {formattedValue}
        </p>
        <div
          data-testid="test-calendar"
          className={`${styles.calendar} ${dropdown ? styles.dropActive : ''}`}
        >
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
};

export default DateChange;
