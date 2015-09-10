import React from 'react';
import RR from 'reactive-react';

import { noErrCallbackPromisify } from '../utils/promisify';
import RouterStore from '../stores/router.store';

const pageDidRender$ = RR.Observable.bind('pageDidRender$');

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = { view: props.defaultView, props: props.defaultProps };
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange.bind(this));
  }

  routeChange(route) {
    var { viewName, props } = route;
    if (viewName) {
      this.loadView(viewName).then(function(view) {
        this.setState({ view, props: props || {} });
        // render cycle 2
        pageDidRender$({ view, route });
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
