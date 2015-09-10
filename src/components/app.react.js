import React from 'react';

import Router from './router.react';
import Page from './page.react';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { view, props, viewName } = this.props;

    return (
      <div>
        <Router />
        <Page defaultViewName={ viewName } defaultView={ view } defaultProps={ props }/>
      </div>
    );
  }

}

export default App;
