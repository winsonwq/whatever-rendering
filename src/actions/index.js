import RR from 'reactive-react';
import Service from '../services/service';
import RouterAction from './router.action';

export default RR.Observable.createAction({

  fetchTodos$() {
    return RouterAction.Root$
      .flatMapLatest(() => Service.getTodos());
  },

  initTodos$() {
    return RouterAction.InitAsRoot$.map(({ props }) => props.todos);
  },

  fillTodos$() {
    return this.fetchTodos$.merge(this.initTodos$);
  },

  todoAdded$(submitTodo$) {
    return submitTodo$
      .flatMapLatest(function(data) {
        return Service.createTodo(data.text).then(resp => ({ resp, data }));
      });
  },

  todoAddedSuccessBody$() {
    return this.todoAdded$
      .filter(ret => ret.resp.ok)
      .map(ret => ret.resp.body);
  }

});
