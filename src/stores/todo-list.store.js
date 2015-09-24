import Rx from 'rx';
import R from 'ramda';
import { fillTodos$, todoAddedSuccessBody$ } from '../actions';
import toReducer from '../utils/to-reducer';

const resetTodos$ = fillTodos$
  .map(toReducer(function(sofar, todos) {
    return R.merge(sofar, { todos });
  }));

const addTodo$ = todoAddedSuccessBody$
  .map(toReducer(function(sofar, todo) {
    return R.merge(sofar, { todos: sofar.todos.concat([todo]) });
  }));

export const todos$ = Rx.Observable
  .merge(
    resetTodos$,
    addTodo$
  )
  .scan((sofar, reducer) => reducer(sofar), { todos: [] });
