import { Promise } from 'es6-promise';

var todos = [
  { text: 'task 1' },
  { text: 'task 2' },
  { text: 'task 3' }
];

export default {
  getTodos() {
    // fake api request
    return Promise.resolve(todos);
  },

  createTodo(text) {
    todos.push({ text });
    return Promise.resolve({
      ok: true,
      body: todos[todos.length - 1]
    });
  }
};
