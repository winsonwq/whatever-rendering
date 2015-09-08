
import { root$ } from './index';
import { view } from '../utils/server-view';
import action from '../actions/';
import TodoListApp from '../components/todo-list-app.react';

root$
  .flatMapLatest(function(route) {
    return action.fetchTodos$.map(todos => ({ todos, route }));
  })
  .subscribe(function(data) {

    var { res, req } = data.route;
    var sView = view(req._parsedUrl.path, TodoListApp, { todos: data.todos });
    res.render('index', sView);

  });
