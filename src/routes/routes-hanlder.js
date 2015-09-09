
import { root$, readme$ } from './index';
import { view } from '../utils/server-view';
import action from '../actions/';
import TodoListApp from '../components/todo-list-app.react';
import Readme from '../components/readme.react';

root$
  .flatMapLatest(function(route) {
    return action.fetchTodos$.map(todos => ({ todos, route }));
  })
  .subscribe(function(data) {

    var { res } = data.route;
    var sView = view(TodoListApp, { todos: data.todos });
    res.render('index', sView);

  });

readme$
  .subscribe(function(route) {
    var { res } = route;
    var sView = view(Readme);
    res.render('index', sView);
  });
