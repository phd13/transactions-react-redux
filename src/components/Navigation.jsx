import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Auth from '../services/Auth';
const auth = new Auth();

export default class Navigation extends Component {
  state = {
    redirectToReferrer: false
  };

  logout = () => {
    auth.signout(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="navigation">
        <Link to="/create-transactions">Create Transactions</Link>
        <Link to="/view-transactions">View Transactions</Link>
        <button onClick={this.logout}>logout</button>
      </div>
    );
  }
}
