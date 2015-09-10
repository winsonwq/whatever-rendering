import RR from 'reactive-react';
import Service from '../services/service';
import RouterAction from './router.action';

export default RR.Observable.createAction({

  fetchTodos$() {
    return RouterAction.mergedRoot$
      .flatMapLatest(() => Service.getTodos());
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
