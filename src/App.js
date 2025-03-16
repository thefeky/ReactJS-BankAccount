import { useReducer } from "react";
import "./styles.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)
 DONE
2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.
 DONE
3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer
 DONE
4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)
 DONE
5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state
 DONE
6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)
 DONE
7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
 DONE
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  depositAmount: 0,
  withdrawAmount: 0,
  loanAmount: 0,
  payLoanAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        depositAmount: state.depositAmount,
        balance: state.balance + state.depositAmount,
      };
    case "defineDepositAmount":
      return { ...state, depositAmount: action.payload };
    case "withdraw":
      if (state.withdrawAmount > state.balance) {
        alert("Not enough money!");
        return state;
      }
      return {
        ...state,
        balance:
          state.balance >= state.withdrawAmount
            ? state.balance - state.withdrawAmount
            : state.balance,
      };
    case "defineWithdrawAmount":
      return { ...state, withdrawAmount: action.payload };
    case "requestLoan":
      return {
        ...state,
        loan: state.loanAmount,
        balance:
          state.loan === 0 ? state.balance + state.loanAmount : state.balance,
      };
    case "defineLoanAmount":
      return { ...state, loanAmount: action.payload };
    case "payLoan":
      if (state.loan < state.payLoanAmount) {
        alert(`Current loan is ${state.loan} $ !`);
        return state;
      }
      return {
        ...state,
        loan:
          state.loan >= state.payLoanAmount
            ? state.loan - state.payLoanAmount
            : state.loan,
        balance: state.balance - state.loan,
      };
    case "definePayLoanAmount":
      return { ...state, payLoanAmount: action.payload };
    case "closeAccount":
      if (state.balance !== 0 && state.loan !== 0) {
        return {
          state,
        };
      }
      return {
        ...state,
        depositAmount: 0,
        withdrawAmount: 0,
        loanAmount: 0,
        payLoanAmount: 0,
        isActive: !(state.balance === 0 && state.loan === 0),
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      balance,
      loan,
      isActive,
      depositAmount,
      withdrawAmount,
      loanAmount,
      payLoanAmount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance} $</p>
      <p>Loan: {loan} $</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <input
          disabled={!isActive}
          value={depositAmount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              dispatch({
                type: "defineDepositAmount",
                payload: Number(e.target.value),
              });
            }
          }}
        />
        <span> $ </span>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={!isActive}
        >
          Deposit
        </button>
      </p>
      <p>
        <input
          disabled={!isActive}
          value={withdrawAmount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              dispatch({
                type: "defineWithdrawAmount",
                payload: Number(e.target.value),
              });
            }
          }}
        />
        <span> $ </span>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={!isActive}
        >
          Withdraw
        </button>
      </p>
      <p>
        <input
          disabled={!isActive}
          value={loanAmount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              dispatch({
                type: "defineLoanAmount",
                payload: Number(e.target.value),
              });
            }
          }}
        />
        <span> $ </span>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan" });
          }}
          disabled={!isActive}
        >
          Request a loan
        </button>
      </p>
      <p>
        <input
          disabled={!isActive}
          value={payLoanAmount}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              dispatch({
                type: "definePayLoanAmount",
                payload: Number(e.target.value),
              });
            }
          }}
        />
        <span> $ </span>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
