import React, { useState, useEffect } from 'react';
import styles from './CustomInput.module.css';

const CustomInput = React.memo(
  ({
    value,
    label,
    inputRef,
    name,
    type,
    onChange,
    error,
    description,
    maxLength,
    test,
    testError,
  }) => {
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      setIsFilled(!!value);
    }, [value]);

    const handleClearInput = () => {
      onChange('');
      setIsFilled(false);
    };

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      onChange(inputValue);
      setIsFilled(!!inputValue);
    };

    return (
      <div>
        <label className={styles.inp}>
          <input
            type={type}
            value={value}
            name={name}
            id={name}
            ref={inputRef}
            placeholder="&nbsp;"
            onChange={handleInputChange}
            maxLength={maxLength}
            data-testid={test ? test : undefined}
            className={`${error && styles.error}`}
          />

          {label && (
            <span htmlFor={name} className={styles.label}>
              {label}
            </span>
          )}
          {isFilled && (
            <span className={styles.closeIcon} onClick={handleClearInput}>
              Close
            </span>
          )}
        </label>
        {description && <div className="input-description">{description}</div>}
        {error && (
          <div
            className={styles.errorValidation}
            data-testid={testError ? testError : undefined}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default CustomInput;
