import { root$ } from './index';
import action from '../actions/';

root$
  .flatMapLatest(function(route) {
    return action.fetchData$.map(data => ({ data, route }));
  })
  .subscribe(function(data) {
    var { res } = data.route;
    res.end('hello world');
  });
