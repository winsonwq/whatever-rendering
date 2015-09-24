import { compose, flip, nthArg } from 'ramda';

export default function toReducer(reduce) {
  return compose(flip(reduce), nthArg(0));
}
