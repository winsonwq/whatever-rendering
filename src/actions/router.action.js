import RR from 'reactive-react';
import Rx from 'rx';

export default RR.Observable.createAction({

  route$(root$) {
    return Rx.Observable.merge(root$);
  }

});
