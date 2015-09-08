import React from 'react';

import { root$ } from './index';
import action from '../actions/';
import TodoListApp from '../components/todo-list-app';

const TodoListAppFactory = React.createFactory(TodoListApp);

root$
  .flatMapLatest(function(route) {
    return action.fetchTodos$.map(todos => ({ todos, route }));
  })
  .subscribe(function(data) {

    var { res } = data.route;
    var reactHtml = React.renderToString(TodoListAppFactory({ todos: data.todos }));

    res.render('index', { reactHtml });
    
  });
