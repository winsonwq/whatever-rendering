import RR from 'reactive-react';
import Rx from 'rx';
import R from 'ramda';

export default RR.Observable.createAction({

  route$(root$, readme$, linkRedirect$) {
    return Rx.Observable.merge(
      root$,
      readme$,
      linkRedirect$
    );
  },

  //
  // Render cycle one:
  // root$ would trigger page render without props and actions
  //
  // Render cycle two:
  // asyncViewDidRender$ would trigger actions and stors to fill the view state
  //
  Root$(root$, asyncViewDidRender$) {
    return filterByRouteName(asyncViewDidRender$, 'root$').merge(root$);
  },

  InitAsRoot$(landingViewDidRender$) {
    return landingViewDidRender$.filter(({ viewName }) => viewName == 'todo-list-app');
  }

});

function filterByRouteName(stream, routeName) {
  return stream.filter(({ route }) => route.name == routeName).map(R.prop('route'));
}
