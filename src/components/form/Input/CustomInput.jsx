import React, { useState, useEffect } from "react";
import styles from "./CustomInput.module.css";
import { ReactComponent as Icon } from "../../../assets/input-close.svg";

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
    id,
  }) => {
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      setIsFilled(!!value);
    }, [value]);

    const handleClearInput = () => {
      onChange("");
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
              <Icon />
            </span>
          )}
        </label>
        {description && <div className="input-description">{description}</div>}
        {error && (
          <p
            className={styles.errorValidation}
            data-testid={testError ? testError : undefined}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default CustomInput;
