import React from 'react';
import RR from 'reactive-react';
import director from 'director';
import R from 'ramda';
import Rx from 'rx';

import RouterStore from '../stores/router.store';

import Browser from '../utils/browser';

const router = new director.Router();
const observableRoute = observableFromCallback(router.on.bind(router));

class Router extends React.Component {

  constructor(props) {
    super(props);
    var { defaultPath } = props;
    this.state = { defaultPath };
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange);

    Router.route('root$', '/', 'todo-list-app');

    router.configure({
      html5history: true
    });

    router.init(this.state.defaultPath);
  }

  routeChange(route) {
    if (route.redirect) {
      window.location.href = route.path;
    } else if (route.replace) {
      // TODO: use replace state
      window.location.replace(route.path);
    } else if (!route.viewName){
      router.setRoute(route.path);
    }
  }

  render() { return null; }

}

Router.route = function(name, path, viewName, viewInfo) {
  var observableRoute$ = observableRoute(path).map(function(paramVals) {
    return {
      path: Browser.path(),
      viewName,
      params: R.merge(R.zipObj(getParamKeysFromPath(path), paramVals), viewInfo),
      query: Browser.query()
    };
  });

  return RR.replicate(observableRoute$, name);
};

function getParamKeysFromPath(path) {
  var firstEqualColon = (path) => path[0] == ':';
  return path.split('/').filter(firstEqualColon).map(x => x.substring(1));
}

function observableFromCallback(func) {
  return function() {
    var args = [].slice.call(arguments);
    var subject = new Rx.Subject();

    args.push(function() {
      subject.onNext([].slice.call(arguments));
    });

    func.apply(null, args);
    return subject;
  };
}

export default Router;
