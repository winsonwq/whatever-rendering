import { Promise } from 'es6-promise';

export default {
  fetchData() {
    return Promise.resolve({ value: 1 });
  }
};
