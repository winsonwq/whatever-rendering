import RR from 'reactive-react';

import RouterAction from '../actions/router.action';

export default RR.Observable.createStore(
  RouterAction, ['route$'],
  function(route$) {

    return { route$ };
    
  }
);
