import React from 'react';

import Router from './router.react';
import Page from './page.react';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { view, props } = this.props;

    return (
      <div>
        <Router />
        <Page defaultView={ view } defaultProps={ props }/>
      </div>
    );
  }

}

export default App;
