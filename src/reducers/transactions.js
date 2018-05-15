import { TRANSACTIONS_RECEIVED } from '../vars';

export default function transactions(state = [], { type, payload }) {
  switch(type) {
    case TRANSACTIONS_RECEIVED:
      return payload;
    
    default:
      return state;
  }
}