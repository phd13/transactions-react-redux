import axios from 'axios';
import {
  BANKS_RECEIVED,
  TRANSACTIONS_RECEIVED
} from '../vars';

export function getBanks() {
  return async dispatch => {
    const { data: banks } = await axios.get('/banks-db.json');
    dispatch({
      type: BANKS_RECEIVED,
      payload: banks
    });
  }
}

export function removeTransaction(id) {
  return dispatch => {
    let storagedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || [];
    storagedTransactions = storagedTransactions.filter(transaction => transaction.id !== id);
    sessionStorage.setItem('transactions', JSON.stringify(storagedTransactions));

    dispatch({
      type: TRANSACTIONS_RECEIVED,
      payload: storagedTransactions
    });
  };
}

export function addTransaction(sum, selectedBank) {
  return (dispatch, getState) => {
    let storagedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || [];
    const { banks } = getState();
    const { bankName } = banks.find(bank => bank.bankId === selectedBank);

    const transaction = {
      id: String(Math.random()).slice(2, 7),
      amount: sum,
      bankId: selectedBank,
      bankName
    };

    storagedTransactions.push(transaction);
    sessionStorage.setItem('transactions', JSON.stringify(storagedTransactions));

    dispatch({
      type: TRANSACTIONS_RECEIVED,
      payload: storagedTransactions
    });
  };
}

export function getTransactions() {
  return async dispatch => {
    const { data: transactions } = await axios.get('/transactions-db.json');
    dispatch({
      type: TRANSACTIONS_RECEIVED,
      payload: transactions
    });

    const storagedTransactions = JSON.parse(sessionStorage.getItem('transactions'));
    if (storagedTransactions) {
      dispatch({
        type: TRANSACTIONS_RECEIVED,
        payload: storagedTransactions
      });
    }
  };
}