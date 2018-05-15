import { combineReducers } from 'redux';
import banks from './banks';
import transactions from './transactions';

export default combineReducers({
  banks,
  transactions
});