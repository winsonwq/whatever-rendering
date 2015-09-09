import React from 'react';

import RouterStore from '../stores/router.store';

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
    this.loadAndSetView(viewName, props);
  }

  loadAndSetView(viewName, props) {
    if (viewName) {
      global.loadjs([viewName], function(view) {
        this.setState({ view, props: props || {} });
      }.bind(this));
    }
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
