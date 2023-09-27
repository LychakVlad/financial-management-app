import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import { ReactComponent as Icon } from "../../../assets/dropdown.svg";

const Dropdown = ({
  placeHolder,
  options,
  onChange,
  error,
  setPlaceHolder,
  test,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    setShowMenu(!showMenu);
  };

  const handleItemClick = (option) => {
    setSelectedValue(option);
    setShowMenu(false);
    if (onChange) {
      onChange(option);
    }
    setPlaceHolder(option.label);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${error && styles.error}`}>
        <div
          data-testid={test}
          onClick={handleInputClick}
          className={styles.input}
        >
          <div className={styles.selectedValue}>{placeHolder}</div>
          <div className={styles.tools}>
            <div className={`${styles.icon} ${showMenu && styles.active}`}>
              <Icon />
            </div>
          </div>
        </div>
        {showMenu && (
          <div className={styles.menu}>
            {options.map((option, index) => (
              <div
                onClick={() => handleItemClick(option)}
                key={option.value}
                className={styles.item}
                data-testid={`${test}-${index}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className={styles.validationError}>Please choose an option.</p>
      )}
    </div>
  );
};

export default Dropdown;
