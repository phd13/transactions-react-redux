import { BANKS_RECEIVED } from '../vars';

export default function banks(state = [], { type, payload }) {
  switch(type) {
    case BANKS_RECEIVED:
      return payload;

    default:
      return state;
  }
}