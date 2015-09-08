import RR from 'reactive-react';
import Service from '../services/service';

export default RR.Observable.createAction({

  fetchTodos$(root$) {
    return root$.flatMapLatest(() => Service.getTodos());
  }

});
