import RR from 'reactive-react';
import Rx from 'rx';

import Action from '../actions/';

export default RR.Observable.createStore(
  Action, ['fetchTodos$', 'todoAddedSuccessBody$'],
  function(fetchTodos$, todoAddedSuccessBody$) {

    var data = { todos: [] };

    var resetTodos$ = fetchTodos$
      .map(function(todos) {
        return function(sofar) {
          sofar.todos = todos;
          return sofar;
        };
      });

    var addTodo$ = todoAddedSuccessBody$
      .map(function(todo) {
        return function(sofar) {
          sofar.todos = sofar.todos.concat([todo]);
          return sofar;
        };
      });

    var todos$ = Rx.Observable
      .merge(
        resetTodos$,
        addTodo$
      ).scan(function(sofar, transform) {
        return transform(sofar);
      }, data);

    return { todos$ };

  }
);
