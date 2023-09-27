import React from "react";
import styles from "./Radio.module.css";

function Radio({ value, name, id, selectedOption, onChange, test }) {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className={styles.radio} data-testid={test}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={selectedOption}
        onChange={handleChange}
        className={styles.radioInput}
      />
      <label htmlFor={id} className={styles.radioLabel}>
        {value}
      </label>
    </div>
  );
}

export default Radio;
