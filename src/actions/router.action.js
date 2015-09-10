import RR from 'reactive-react';
import Rx from 'rx';

import routes from '../routes/routes-config';

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
    return asyncViewDidRender$.filter(byRouteNameWhen('root$')).merge(root$);
  },

  InitAsRoot$(landingViewDidRender$) {
    return landingViewDidRender$.filter(byViewNameWhen('root$', routes));
  }

});

function byRouteNameWhen(routeName) {
  return ({ route }) => route.name == routeName;
}

function byViewNameWhen(routeName, source = []) {
  return function({ viewName }) {
    var target = source.filter(route => route.name == routeName)[0] || {};
    return viewName == target.viewName;
  };
}
