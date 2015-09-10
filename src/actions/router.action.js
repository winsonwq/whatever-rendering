import RR from 'reactive-react';
import Rx from 'rx';

export default RR.Observable.createAction({

  route$(root$, readme$, linkRedirect$) {
    return Rx.Observable.merge(
      root$,
      readme$,
      linkRedirect$
    );
  },

  mergedRoot$(root$, pageDidRender$) {
    return filterByRoute(pageDidRender$, 'root$').merge(root$);
  }

});

function filterByRoute(stream, routeName) {
  return stream.filter(({ route }) => route.name == routeName);
}
