import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import {
  getTransactions,
  removeTransaction
} from '../actions';

class ViewTransactions extends Component {
  componentDidMount() {
    const { getTransactions } = this.props;
    getTransactions();
  }

  removeTransaction(id) {
    const { removeTransaction } = this.props;
    removeTransaction(id);
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className="view-transactions">
        <Navigation />
        {transactions.length ?
        <table>
          <tbody>
            <tr>
              <td>Bank name</td>
              <td>amount</td>
              <td></td>
            </tr>
            {transactions.map(({ bankName, amount, id }) => (
              <tr key={id}>
                <td>{bankName}</td>
                <td>{amount}</td>
                <td>
                  <button onClick={this.removeTransaction.bind(this, id)}>remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        :
        <div>list is empty</div>
        }
      </div>
    );
  }
}

export default connect(
  ({ transactions }) => ({
    transactions
  }),
  dispatch => ({
    getTransactions() {
      dispatch(getTransactions());
    },

    removeTransaction(id) {
      dispatch(removeTransaction(id));
    }
  })
)(ViewTransactions);