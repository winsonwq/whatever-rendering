import RR from 'reactive-react';
import Service from '../services/service';

export default RR.Observable.createAction({

  fetchData$(root$) {
    return root$.flatMapLatest(function() {
      return Service.fetchData();
    });
  }

});
