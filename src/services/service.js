import { Promise } from 'es6-promise';

var todos = [
  { id: 1, text: 'task 1' },
  { id: 2, text: 'task 2' },
  { id: 3, text: 'task 3' }
];

export default {
  getTodos() {
    // fake api request
    return Promise.resolve(todos);
  }
};
