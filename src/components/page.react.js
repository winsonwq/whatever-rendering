import React from 'react';
import RR from 'reactive-react';

import { noErrCallbackPromisify } from '../utils/promisify';
import RouterStore from '../stores/router.store';

//
// Async view is the view load in future
const asyncViewDidRender$ = RR.Observable.bind('asyncViewDidRender$');

//
// Landing view is the landing page view, which is with props
const landingViewDidRender$ = RR.Observable.bind('landingViewDidRender$');

class Page extends React.Component {

  constructor(properties) {
    super(properties);

    var view = properties.defaultView;
    var props = properties.defaultProps;
    var currentViewName = properties.defaultViewName;

    this.state = { view, props, loadedViews: [currentViewName], currentViewName };

    landingViewDidRender$({ view, props, viewName: currentViewName });
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange.bind(this));
  }

  routeChange(route) {
    var { viewName } = route;
    var { currentViewName, loadedViews } = this.state;

    if (viewName && currentViewName != viewName) {
      this.loadView(viewName).then(function(view) {
        this.setState({ view, currentViewName: viewName });
        /*
          TODO: find one time render solution
          trigger the second render cycle to reuse action logic when the compoent first load
        */
        if (loadedViews.indexOf(viewName) == -1) {
          asyncViewDidRender$({ view, route });
          this.setState({ loadedViews: loadedViews.concat([viewName]) });
        }

      }.bind(this));
    }
  }

  loadView(viewName) {
    return noErrCallbackPromisify(global.loadjs)([viewName]).then(ret => ret[0]);
  }

  render() {
    var { view, props } = this.state;

    return (
      <div>
        { React.createFactory(view)(props) }
      </div>
    );
  }

}

export default Page;
