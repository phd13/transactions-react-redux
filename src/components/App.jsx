import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CreateTransactions from './CreateTransactions';
import ViewTransactions from './ViewTransactions';
import NotFound from './NotFound';
import Login from './Login';
import '../styles/main.scss';


export default function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Redirect exact from="/" to="/create-transactions" />
          <PrivateRoute path="/create-transactions" component={CreateTransactions} />
          <PrivateRoute path="/view-transactions" component={ViewTransactions} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
}