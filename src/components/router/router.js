import createHistory from 'history/lib/createBrowserHistory';
import RR from 'reactive-react';
import R from 'ramda';
import qs from 'qs';

import routes from '../../routes/routes-config';
import { route$ } from '../../stores/router.store';

const matchPath = R.curry(function(pathname, path) {
  return pathname.match(pathToRegExp(path));
});

const pathToRegExp = R.curry(function(path) {
  const containsParams = path.indexOf(':') != -1;
  const regexpStr = path
    .split('/')
    .map(function(sp) {
      if (sp[0] == ':') return '(\\w+)';
      return sp;
    })
    .join('/');

  return RegExp(containsParams ? regexpStr : `^${regexpStr}$`);
});

const getParamKeysFromPath = R.curry(function(path) {
  var firstEqualColon = (path) => path[0] == ':';
  return path.split('/').filter(firstEqualColon).map(x => x.slice(1));
});

const handleLocationChange = R.curry(function(observableRoutes, loc) {
  const matchRoute = R.compose(R.length, matchPath(loc.pathname), R.prop('path'));
  const matchedRoute = R.find(matchRoute, observableRoutes);

  const paramNames = getParamKeysFromPath(matchedRoute.path);
  const params = matchPath(loc.pathname, matchedRoute.path).slice(1);

  matchedRoute.subject$.onNext({
    name: matchedRoute.name,
    viewName: matchedRoute.viewName,
    path: loc.pathname,
    query: qs.parse(loc.search.slice(1)),
    params: R.merge(R.zipObj(paramNames, params), matchedRoute.viewName),
    action: loc.action,
    key: loc.key
  });
});

const handleRouteChange = R.curry(function(history, route) {
  if (route.redirect) {
    window.location.href = route.path;
  } else if (route.replace) {
    history.replaceState(route.state, route.path);
  } else if (!route.name){
    history.pushState(route.state, route.path);
  }
});

if (typeof window !== 'undefined') {

  const observableRoutes = routes
    .filter(({ method }) => method == 'get')
    .map((config) => R.merge(config, { subject$: RR._getObservable(config.name) }));

  const history = createHistory();
  history.listen(handleLocationChange(observableRoutes));
  route$.subscribe(handleRouteChange(history));

}
