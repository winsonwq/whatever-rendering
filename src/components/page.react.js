import React from 'react';
import RR from 'reactive-react';

import RouterStore from '../stores/router.store';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange.bind(this));
  }

  routeChange(route) {
    // TODO: director bug
    if (!this.state.first) {
      this.setState({ first: true });
    } else {
      var { viewName, reactHtml, props } = route;
      this.setState({ viewName, reactHtml, props });
    }
  }

  loadAndSetComponent() {
    var state = this.state;
    if (!state.reactHtml) {
      global.loadjs([state.viewName], function(component) {
        this.setState({ component });
      }.bind(this));
    }
  }

  render() {
    var { children } = this.props;

    return (
      <div>
        { children }
      </div>
    );
  }

}

export default Page;
