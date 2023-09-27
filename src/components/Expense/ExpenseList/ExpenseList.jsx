import React, { useEffect, useState } from "react";
import styles from "./ExpenseList.module.css";
import MoonLoader from "react-spinners/MoonLoader";
import firebase from "firebase/compat/app";
import {
  removeExpenseAction,
  updateExpenseAction,
} from "../../../store/actions/expenseActions";
import { firestore } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../contexts/AuthContext";
import CustomButton from "../../form/Button/CustomButton";
import { formatNumber } from "../../../utils/formatNumber";
import { formatDate } from "../../../utils/dateFormat";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ExpenseList = ({ dates, setDates }) => {
  const { expenses, totalExpense } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.currentUser) {
      const fetchData = async () => {
        setLoading(true);
        const userId = currentUser.currentUser.uid;
        const userDocRef = firestore.collection("users").doc(userId);
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        setLoading(false);

        const sortedExpenses = Array.isArray(userData?.expenses)
          ? userData.expenses.sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            )
          : [];

        const filteredExpenses = sortedExpenses.filter(
          (item) =>
            formatDate(dates.from) <= item.date &&
            item.date <= formatDate(dates.to),
        );

        dispatch(updateExpenseAction(filteredExpenses));
      };

      fetchData();
    }
  }, [currentUser, dispatch, dates]);

  const deletePoint = async (expense) => {
    const userDocRef = doc(firestore, "users", currentUser.currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    const money = userDoc.data().money;

    if (expense.pay === "Card") {
      await updateDoc(userDocRef, {
        expenses: firebase.firestore.FieldValue.arrayRemove(expense),
        totalExpense: totalExpense - parseFloat(expense.amount),
        money: {
          totalCard: money.totalCard + parseFloat(expense.amount),
          totalCash: money.totalCash,
          totalSavings: money.totalSavings,
        },
      });
    } else if (expense.pay === "Cash") {
      await updateDoc(userDocRef, {
        expenses: firebase.firestore.FieldValue.arrayRemove(expense),
        totalExpense: totalExpense - parseFloat(expense.amount),
        money: {
          totalCash: money.totalCash + parseFloat(expense.amount),
          totalCard: money.totalCard,
          totalSavings: money.totalSavings,
        },
      });
    }

    dispatch(removeExpenseAction(expense.id));
  };

  return (
    <ul className={styles.list}>
      {loading ? (
        <div className={styles.loading}>
          <MoonLoader color="#2e8b43" />
        </div>
      ) : (
        <>
          {expenses.length > 0 ? (
            <div className={styles.listWrapper}>
              {expenses.map((expense, index) => (
                <div
                  data-testid={`expense-list-item-test-${index}`}
                  key={expense.id}
                  className={styles.item}
                >
                  <span className={styles.expense}>
                    -{formatNumber(expense.amount)} $
                  </span>
                  <span className={styles.description}>
                    {expense.description}
                  </span>
                  <span>{expense.type}</span>
                  <span>{expense.pay}</span>
                  <span>{expense.date}</span>
                  <CustomButton
                    type="submit"
                    title="Delete"
                    onClick={() => deletePoint(expense)}
                    disabled={loading}
                    test={`delete-btn-expense-item-test-${index}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>No expense yet...</div>
          )}
        </>
      )}
    </ul>
  );
};

export default ExpenseList;
