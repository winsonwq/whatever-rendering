import React from 'react';
import RR from 'reactive-react';
import director from 'director';
import R from 'ramda';
import Rx from 'rx';

import routes from '../routes/routes-config';

import { route$ } from '../stores/router.store';

import Browser from '../utils/browser';

const router = new director.Router();
const observableRoute = observableFromCallback(router.on.bind(router));

class Router extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    route$.subscribe(this.routeChange.bind(this));

    // only get method need to be registered
    routes
      .filter(({ method }) => method == 'get')
      .forEach(({ path, name, viewName }) => Router.route(name, path, viewName));

    router.configure({
      html5history: true,
      run_handler_in_init: false
    });

    router.init();
  }

  routeChange(route) {
    if (route.redirect) {
      window.location.href = route.path;
    } else if (route.replace) {
      // TODO: use replace state
      window.location.replace(route.path);
    } else if (!route.name){
      router.setRoute(route.path);
    }
  }

  render() { return null; }

}

Router.route = function(name, path, viewName, viewInfo) {
  var observableRoute$ = observableRoute(path).map(function(paramVals) {
    return {
      name,
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
