import RR from 'reactive-react';
import Service from '../services/service';

export default RR.Observable.createAction({

  fetchTodos$(root$) {
    return root$.flatMapLatest(() => Service.getTodos());
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
