import RR from 'reactive-react';

import Action from '../actions/';

export default RR.Observable.createStore(
  Action, ['fetchTodos$'],
  function(fetchTodos$) {

    var data = { todos: [] };

    var resetTodos$ = fetchTodos$
      .map(function(todos) {
        return function(sofar) {
          sofar.todos = todos;
          return sofar;
        };
      });

    var todos$ = resetTodos$.scan(data, (sofar, transform) => transform(sofar));

    return { todos$ };

  }
);
