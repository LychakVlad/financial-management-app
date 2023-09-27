import React, { useCallback, useState } from "react";
import styles from "./TransferStats.module.css";
import CustomInput from "../../form/Input/CustomInput";
import Dropdown from "../../form/Dropdown/Dropdown";
import CustomButton from "../../form/Button/CustomButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import {
  updateCardAction,
  updateCashAction,
  updateSavingsAction,
} from "../../../store/actions/incomeActions";

const TransferStats = ({ handleClick }) => {
  const [loading, setLoading] = useState(false);
  const [transferError, setTransferError] = useState(false);
  const [dropdownFromError, setDropdownFromError] = useState(false);
  const [dropdownFromPlaceholder, setDropdownFromPlaceholder] =
    useState("From");
  const [dropdownToError, setDropdownToError] = useState(false);
  const [dropdownToPlaceholder, setDropdownToPlaceholder] = useState("To");
  const [inputError, setInputError] = useState("");
  const [transferItem, setTransferItem] = useState({
    amount: "",
    from: "",
    to: "",
  });
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const optionsFrom = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "Savings", label: "Savings" },
  ];

  const optionsTo = [
    { value: "Cash", label: "Cash" },
    { value: "Card", label: "Card" },
    { value: "Savings", label: "Savings" },
  ];

  const handleTransfer = useCallback(async () => {
    try {
      if (!transferItem.from) {
        setDropdownFromError(true);
        return;
      }

      if (!transferItem.to) {
        setDropdownToError(true);
        return;
      }

      if (!transferItem.amount) {
        setInputError("Enter the value");
        return;
      }

      setLoading(true);

      const transfer = {
        amount: parseFloat(transferItem.amount),
        from: transferItem.from,
        to: transferItem.to,
      };

      const userDocRef = doc(firestore, "users", currentUser?.uid);
      const userDoc = await getDoc(userDocRef);
      const money = userDoc.data().money;

      const availableBalance =
        money[
          transfer.from === "Savings"
            ? "totalSavings"
            : transfer.from === "Card"
            ? "totalCard"
            : "totalCash"
        ];
      if (transfer.amount > availableBalance) {
        setInputError(
          "Transfer amount exceeds the available balance or balance is 0",
        );
        setLoading(false);
        return;
      }

      const transferMapping = {
        Card: {
          Cash: { source: "totalCard", target: "totalCash" },
          Savings: { source: "totalCard", target: "totalSavings" },
        },
        Cash: {
          Card: { source: "totalCash", target: "totalCard" },
          Savings: { source: "totalCash", target: "totalSavings" },
        },
        Savings: {
          Card: { source: "totalSavings", target: "totalCard" },
          Cash: { source: "totalSavings", target: "totalCash" },
        },
      };

      if (
        transfer.from in transferMapping &&
        transfer.to in transferMapping[transfer.from]
      ) {
        const { source, target } = transferMapping[transfer.from][transfer.to];
        const updatedMoney = {
          ...money,
          [source]: money[source] - transfer.amount,
          [target]: money[target] + transfer.amount,
        };

        await updateDoc(userDocRef, { money: updatedMoney });

        if (transfer.to === "Card") {
          dispatch(
            updateCardAction(money.totalCard + parseFloat(transfer.amount)),
          );
          dispatch(updateCashAction(money.totalCash));
          dispatch(updateSavingsAction(money.totalSavings));
        } else if (transfer.to === "Cash") {
          dispatch(
            updateCashAction(money.totalCash + parseFloat(transfer.amount)),
          );
          dispatch(updateCardAction(money.totalCard));
          dispatch(updateSavingsAction(money.totalSavings));
        } else if (transfer.to === "Savings") {
          dispatch(
            updateSavingsAction(
              money.totalSavings + parseFloat(transfer.amount),
            ),
          );
          dispatch(updateCardAction(money.totalCard));
          dispatch(updateCashAction(money.totalCash));
        }

        setTransferItem({ amount: "", from: "", to: "" });
        setInputError("");
        setDropdownToPlaceholder("To");
        setDropdownFromPlaceholder("From");
        setLoading(false);
        handleClick(false);
      } else {
        setTransferError("Invalid transfer combination");
      }
    } catch (error) {
      console.log("Transfer error:", error);
    }
  }, [currentUser?.uid, transferItem, handleClick, dispatch]);

  const handleDropdownFromChange = (option) => {
    setTransferItem({ ...transferItem, from: option.value });
    setDropdownFromError(false);
  };

  const handleDropdownToChange = (option) => {
    setTransferItem({ ...transferItem, to: option.value });
    setDropdownToError(false);
  };

  const handleInputChange = (value) => {
    setTransferItem({ ...transferItem, amount: value });
    setInputError("");
  };

  return (
    <div className={styles.main}>
      <h2>Transfer money</h2>
      <div className={styles.forms}>
        <Dropdown
          placeHolder={dropdownFromPlaceholder}
          setPlaceHolder={setDropdownFromPlaceholder}
          options={optionsFrom}
          onChange={handleDropdownFromChange}
          error={dropdownFromError}
        />
        <Dropdown
          placeHolder={dropdownToPlaceholder}
          setPlaceHolder={setDropdownToPlaceholder}
          options={optionsTo}
          onChange={handleDropdownToChange}
          error={dropdownToError}
        />
        <CustomInput
          label="Amount"
          type="number"
          id="transfer-amount"
          step="0.01"
          value={transferItem.amount}
          error={inputError}
          required
          onChange={handleInputChange}
        />
      </div>
      {transferError && (
        <div className={styles.transferError}>{transferError}</div>
      )}
      <CustomButton title={"Confirm transfer"} onClick={handleTransfer} />
    </div>
  );
};

export default TransferStats;
