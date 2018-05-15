import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBanks, addTransaction } from '../actions';
import Navigation from './Navigation';


class CreateTransactions extends Component {
  state = {
    sum: '',
    selectedBank: 0
  };

  componentDidMount() {
    const { getBanks } = this.props;
    getBanks();
  }

  changeSum = ({ target }) => {
    this.setState({ sum: target.value });
  };

  changeBank = ({ target }) => {
    this.setState({ selectedBank: target.value });
  };

  addTransaction = () => {
    const { addTransaction } = this.props;
    const { sum, selectedBank } = this.state;
    const parsedSum = Number.parseFloat(sum).toFixed(2);

    if (parsedSum !== parsedSum || parsedSum == 'NaN') {
      return alert('Please, put a correct number');
    }

    addTransaction(+sum, +selectedBank);
  };

  render() {
    const { banks } = this.props;

    return (
      <div className="create-transactions">
        <Navigation />
        {banks.length ? 
          <div className="banks-form">
            <input type="number" placeholder="sum rub" onChange={this.changeSum}/>
            <select onChange={this.changeBank}>
              {banks.map(({ bankName, bankId }, i) => (
                <option value={bankId} key={i}>{bankName}</option>
              ))}
            </select>
            <button onClick={this.addTransaction}>Add transaction</button>
          </div>
          :
          <div>Loading...</div>
        }
      </div>
    );
  }
}

export default connect(
  ({ banks }) => ({
    banks
  }),
  dispatch => ({
    getBanks() {
      dispatch(getBanks());
    },

    addTransaction(sum, selectedBank) {
      dispatch(addTransaction(sum, selectedBank));
    }
  })
)(CreateTransactions);