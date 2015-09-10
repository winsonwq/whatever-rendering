import React from 'react';
import RR from 'reactive-react';
import R from 'ramda';

import { noErrCallbackPromisify } from '../utils/promisify';
import RouterStore from '../stores/router.store';

const pageDidRender$ = RR.Observable.bind('pageDidRender$');

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: props.defaultView,
      props: props.defaultProps,
      loadedViews: [props.defaultViewName]
    };
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange.bind(this));
  }

  routeChange(route) {
    var { viewName, props } = route;
    var { currentViewName, loadedViews } = this.state;

    if (viewName && currentViewName != viewName) {
      this.loadView(viewName).then(function(view) {
        this.setState({ view, props, currentViewName: viewName });
        /*
          TODO: find one time render solution
          trigger the second render cycle to reuse action logic when the compoent first load
        */
        if (loadedViews.indexOf(viewName) == -1) {
          pageDidRender$({ view, route });
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
